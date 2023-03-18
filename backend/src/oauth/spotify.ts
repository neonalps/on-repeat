import { getSpotifyClientId, getSpotifyClientSecret, getSpotifyRedirectUrl } from "@src/config";
import { AUTHORIZATION, CONTENT_TYPE, HEADER, HTTP_STATUS } from "@src/http/constants";
import { generateRandomString, getQueryString, removeNull } from "@src/util/common";
import { OAUTH_GRANT_TYPE_AUTHORIZATION_CODE, OAUTH_GRANT_TYPE_REFRESH_TOKEN, OAUTH_RESPONSE_TYPE_CODE } from "./constants";
import http from "@src/http/index";

const OAUTH_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const OAUTH_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const OAUTH_USER_PROFILE_URL = 'https://api.spotify.com/v1/me';
const OAUTH_RECENTLY_PLAYED_TRACKS_URL = 'https://api.spotify.com/v1/me/player/recently-played';

const OAUTH_SCOPE_EMAIL = "user-read-private user-read-email";
const OAUTH_SCOPE_RECENTLY_PLAYED = "user-read-recently-played";

const OAUTH_STATE_PARAM_LENGTH = 12;

const clientId = getSpotifyClientId();
const clientSecret = getSpotifyClientSecret();
const redirectUrl = getSpotifyRedirectUrl();

export const getAuthorizeUrl = (): string => {
    const state = generateRandomString(OAUTH_STATE_PARAM_LENGTH);

    const params = {
        state,
        response_type: OAUTH_RESPONSE_TYPE_CODE,
        client_id: clientId,
        scope: OAUTH_SCOPE_EMAIL,
        redirect_uri: redirectUrl
    };
    return `${OAUTH_AUTHORIZE_URL}?${getQueryString(params)}`;
};

export const exchangeCodeForToken = async (code: string): Promise<OauthTokenResponse> => {
    const response = await http.post<OauthTokenResponseDto>(OAUTH_TOKEN_URL, {
        headers: { 
            [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
            [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BASIC} ${getAuthHeader(clientId, clientSecret)}`,
            [HEADER.CONTENT_TYPE]: CONTENT_TYPE.FORM_URLENCODED,
        },
        body: getCodeExchangeParams(code)
    });

    if (response.statusCode !== HTTP_STATUS.OK) {
        // TODO improve error handling (create extended error class?)
        throw new Error("something went wrong while exchanging code for token");
    }

    const responseBody = response.body;

    // TODO check whether response body is present

    return {
        accessToken: responseBody.access_token,
        refreshToken: responseBody.refresh_token,
        expiresIn: responseBody.expires_in,
        scope: responseBody.scope,
        tokenType: responseBody.token_type,
    };
};

export const getUserProfile = async (accessToken: string): Promise<SpotifyUserProfile> => {
    const response = await http.get<GetUserProfileResponseDto>(OAUTH_USER_PROFILE_URL, {
        headers: { 
            [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
            [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BEARER} ${accessToken}`,
            [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
        }
    });

    if (response.statusCode !== HTTP_STATUS.OK) {
        // TODO improve error handling (create extended error class?)
        throw new Error("something went wrong while getting the user profile");
    }

    const responseBody = response.body;

    // TODO check whether response body is present

    return {
        id: responseBody.id,
        email: responseBody.email,
        displayName: responseBody.display_name,
        href: responseBody.href,
    };
};

export const getNewAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await http.post<OauthTokenResponseDto>(OAUTH_TOKEN_URL, {
        headers: { 
            [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
            [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BASIC} ${getAuthHeader(clientId, clientSecret)}`,
            [HEADER.CONTENT_TYPE]: CONTENT_TYPE.FORM_URLENCODED,
        },
        body: getRefreshTokenParams(refreshToken)
    });

    if (response.statusCode !== HTTP_STATUS.OK) {
        console.error(response.body);
        // TODO improve error handling (create extended error class?)
        throw new Error("something went wrong while getting new access token");
    }

    const responseBody = response.body;

    return {
        accessToken: responseBody.access_token,
        expiresIn: responseBody.expires_in,
        scope: responseBody.scope,
        tokenType: responseBody.token_type,
    };
};

export const getRecentlyPlayedTracks = async (accessToken: string, limit: number, before?: number): Promise<PlayedTracksResponse> => {
    const queryParams: Record<string, any> = { limit };

    if (before) {
        queryParams['before'] = before;
    }

    const queryString = getQueryString(queryParams);
    const url = `${OAUTH_RECENTLY_PLAYED_TRACKS_URL}?${queryString}`;
    const response = await http.get<RecentlyPlayedTracksResponseDto>(url, {
        headers: { 
            [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
            [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BEARER} ${accessToken}`,
            [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
        }
    });

    if (response.statusCode !== HTTP_STATUS.OK) {
        // TODO improve error handling (create extended error class?)
        throw new Error("something went wrong while getting the recently played tracks");
    }

    const responseBody = response.body;
    return parseRecentlyPlayedTracksResponse(responseBody);
};

export const getAuthHeader = (id: string, secret: string): string => {
    return Buffer.from(`${id}:${secret}`, 'utf8').toString('base64');
};

const getCodeExchangeParams = (code: string): string => {
    return getQueryString({
        code,
        grant_type: OAUTH_GRANT_TYPE_AUTHORIZATION_CODE,
        redirect_uri: redirectUrl,
    });
};

const getRefreshTokenParams = (refreshToken: string): string => {
    return getQueryString({
        refresh_token: refreshToken,
        grant_type: OAUTH_GRANT_TYPE_REFRESH_TOKEN,
    });
};

const parseRecentlyPlayedTracksResponse = (response: RecentlyPlayedTracksResponseDto): PlayedTracksResponse => {
    if (!response) {
        throw new Error("No recently played tracks response passed");
    }

    return {
        href: response.href,
        playedTracks: parseRecentlyPlayedTrackList(response.items),
        cursors: response.cursors,
        next: response.next,
        limit: response.limit,
    };
};

const parseRecentlyPlayedTrackList = (playedTracks: SpotifyPlayedTrackDto[]): PlayedTrackDto[] => {
    if (!playedTracks || playedTracks.length === 0) {
        return [];
    }

    return playedTracks
            .map(convertRecentlyPlayedTrack)
            .filter(removeNull);
};

const convertRecentlyPlayedTrack = (item: SpotifyPlayedTrackDto): PlayedTrackDto => {
    return {
        playedAt: item.played_at,
        track: convertPlayedTrack(item.track),
    };
};

const convertPlayedTrack = (item: SpotifyTrackDto): TrackDto => {
    return {
        id: item.id,
        name: item.name,
        artists: convertArtistList(item.artists),
        album: convertAlbum(item.album),
        href: item.href,
        externalIds: item.external_ids,
        externalUrls: item.external_urls,
        explicit: item.explicit,
        durationMs: item.duration_ms,
        discNumber: item.disc_number,
    };
};

const convertArtistList = (items: SpotifyArtistDto[]): ArtistDto[] => {
    return items
            .map(convertArtist)
            .filter(removeNull);
};

const convertArtist = (item: SpotifyArtistDto): ArtistDto => {
    return {
        id: item.id,
        name: item.name,
        type: item.type,
        uri: item.uri,
        href: item.href,
        externalUrls: item.external_urls,
    };
};

const convertAlbum = (item: SpotifyAlbumDto): AlbumDto => {
    return {
        id: item.id,
        name: item.name,
        href: item.href,
        externalUrls: item.external_urls,
        totalTracks: item.total_tracks,
        artists: convertArtistList(item.artists),
        albumGroup: item.album_group,
        albumType: item.album_type,
        images: item.images,
        isPlayable: item.is_playable,
        releaseDate: convertReleaseDate(item.release_date),
        releaseDatePrecision: item.release_date_precision,
        type: item.type,
        uri: item.uri,
    }
};

const convertReleaseDate = (releaseDate: string): Date | null => {
    if (!releaseDate || releaseDate.indexOf("-") < 0) {
        return null;
    }

    return new Date(Date.parse(releaseDate));
};