import { AUTHORIZATION, CONTENT_TYPE, HEADER, HTTP_STATUS } from "@src/http/constants";
import { generateRandomString, getQueryString, removeNull, requireNonNull } from "@src/util/common";
import { OAUTH_GRANT_TYPE_AUTHORIZATION_CODE, OAUTH_GRANT_TYPE_REFRESH_TOKEN, OAUTH_RESPONSE_TYPE_CODE } from "../oauth/constants";
import http from "@src/http/index";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { PlayedTrackDao } from "@src/models/classes/dao/played-track";

export interface SpotifyClientConfig {
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
    authorizeUrl: string;
    tokenUrl: string;
    userProfileUrl: string;
    recentlyPlayedTracksUrl: string;
}

export class SpotifyClient {

    public static OAUTH_SCOPE_EMAIL = "user-read-private user-read-email";
    private static OAUTH_STATE_PARAM_LENGTH = 12;

    private readonly config: SpotifyClientConfig;

    constructor(config: SpotifyClientConfig) {
        this.config = requireNonNull(config);

        this.validateConfig();
    }

    public getAuthorizeUrl(): string {
        const state = generateRandomString(SpotifyClient.OAUTH_STATE_PARAM_LENGTH);

        const params = {
            state,
            response_type: OAUTH_RESPONSE_TYPE_CODE,
            client_id: this.config.clientId,
            scope: SpotifyClient.OAUTH_SCOPE_EMAIL,
            redirect_uri: this.config.redirectUrl
        };
    
        return `${this.config.authorizeUrl}?${getQueryString(params)}`;
    }

    public async exchangeCodeForToken(code: string): Promise<OauthTokenResponse> {
        validateNotBlank(code, "code");

        const response = await http.post<OauthTokenResponseDto>(this.config.tokenUrl, {
            headers: { 
                [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
                [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BASIC} ${this.getAuthHeaderValue()}`,
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.FORM_URLENCODED,
            },
            body: this.getCodeExchangeParams(code)
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while exchanging code for token");
        }
    
        const responseBody = response.body;
    
        return {
            accessToken: responseBody.access_token,
            refreshToken: responseBody.refresh_token,
            expiresIn: responseBody.expires_in,
            scope: responseBody.scope,
            tokenType: responseBody.token_type,
        };
    }

    public async getUserProfile(accessToken: string): Promise<SpotifyUserProfile> {
        validateNotBlank(accessToken, "accessToken");

        const response = await http.get<GetUserProfileResponseDto>(this.config.userProfileUrl, {
            headers: { 
                [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
                [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BEARER} ${accessToken}`,
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
            }
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while getting the user profile");
        }
    
        const responseBody = response.body;
    
        return {
            id: responseBody.id,
            email: responseBody.email,
            displayName: responseBody.display_name,
            href: responseBody.href,
        };
    }

    public async getNewAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
        validateNotBlank(refreshToken, "refreshToken");

        const response = await http.post<OauthTokenResponseDto>(this.config.tokenUrl, {
            headers: { 
                [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
                [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BASIC} ${this.getAuthHeaderValue()}`,
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.FORM_URLENCODED,
            },
            body: this.getRefreshTokenParams(refreshToken)
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while getting new access token");
        }
    
        const responseBody = response.body;
    
        return {
            accessToken: responseBody.access_token,
            expiresIn: responseBody.expires_in,
            scope: responseBody.scope,
            tokenType: responseBody.token_type,
        };
    }

    public async getRecentlyPlayedTracks(accountId: number, accessToken: string, lastSeenPlayedTrack: PlayedTrackDao | null): Promise<PlayedTrackDto[]> {
        validateNotNull(accountId, "accountId");
        validateNotBlank(accessToken, "accessToken");

        const initialRequestSize = lastSeenPlayedTrack === null ? 50 : 5;

        const playedTracksResponse = await this.fetchRecentlyPlayedTracksBatch(accessToken, initialRequestSize);
    
        // TODO here could be a looping logic to get all possible tracks
    
        return playedTracksResponse.playedTracks;
    }

    private async fetchRecentlyPlayedTracksBatch(accessToken: string, limit: number, before?: number): Promise<PlayedTracksResponse> {
        const queryParams: Record<string, any> = { limit };
    
        if (before) {
            queryParams['before'] = before;
        }
    
        const queryString = getQueryString(queryParams);
        const url = `${this.config.recentlyPlayedTracksUrl}?${queryString}`;
        const response = await http.get<RecentlyPlayedTracksResponseDto>(url, {
            headers: { 
                [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
                [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BEARER} ${accessToken}`,
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
            }
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while getting the recently played tracks");
        }
    
        const responseBody = response.body;
        return parseRecentlyPlayedTracksResponse(responseBody);
    }

    private validateConfig(): void {
        validateNotBlank(this.config.clientId, "config.clientId");
        validateNotBlank(this.config.clientSecret, "config.clientSecret");
        validateNotBlank(this.config.redirectUrl, "config.redirectUrl");
        validateNotBlank(this.config.authorizeUrl, "config.authorizeUrl");
        validateNotBlank(this.config.recentlyPlayedTracksUrl, "config.recentlyPlayedTracksUrl");
        validateNotBlank(this.config.userProfileUrl, "config.userProfileUrl");
        validateNotBlank(this.config.tokenUrl, "config.tokenUrl");
    }

    private getAuthHeaderValue(): string {
        return Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`, 'utf8').toString('base64');
    };


    private getCodeExchangeParams(code: string): string {
        return getQueryString({
            code,
            grant_type: OAUTH_GRANT_TYPE_AUTHORIZATION_CODE,
            redirect_uri: this.config.redirectUrl,
        });
    };

    private getRefreshTokenParams(refreshToken: string): string {
        return getQueryString({
            refresh_token: refreshToken,
            grant_type: OAUTH_GRANT_TYPE_REFRESH_TOKEN,
        });
    };
}

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