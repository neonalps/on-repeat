import http from "@src/http/index";
import { AUTHORIZATION, CONTENT_TYPE, HEADER, HTTP_STATUS } from "@src/http/constants";
import { generateRandomString, getQueryString, requireNonNull } from "@src/util/common";
import { OAUTH_GRANT_TYPE_AUTHORIZATION_CODE, OAUTH_GRANT_TYPE_REFRESH_TOKEN, OAUTH_RESPONSE_TYPE_CODE } from "@src/modules/oauth/constants";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { SpotifyRecentlyPlayedTracksResponseDto, SpotifyRecentlyPlayedTracksApiResponseDto, SpotifyArtistDetailsApiDto, SpotifyArtistDetailsDto, SpotifySeveralArtistDetailsApiResponseDto } from "./api-types";
import { SpotifyApiResponseConverter } from "@src/modules/music-provider/spotify/api-response-converter";
import { OauthTokenResponse } from "@src/models/dto/oauth-token-response";
import { SpotifyUserProfile } from "@src/models/dto/user-profile";
import { RefreshTokenResponse } from "@src/models/dto/refresh-token-response";
import { OauthTokenResponseDto } from "@src/models/interface/oauth-token-response.dto";
import { GetUserProfileResponseDto } from "@src/models/interface/get-user-profile-response.dto";

export interface SpotifyClientConfig {
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
    authorizeUrl: string;
    tokenUrl: string;
    userProfileUrl: string;
    artistDetailsUrl: string;
    recentlyPlayedTracksUrl: string;
    scopeOauthLogin: string;
    scopeRecentlyPlayedTracks: string;
}

export class SpotifyClient {
    
    private static OAUTH_STATE_PARAM_LENGTH = 12;

    private readonly config: SpotifyClientConfig;

    constructor(config: SpotifyClientConfig) {
        this.config = requireNonNull(config);

        this.validateConfig();
    }

    public getScopeRecentlyPlayedTracks(): string {
        return this.config.scopeRecentlyPlayedTracks;
    }

    public getAuthorizeUrl(): string {
        const state = generateRandomString(SpotifyClient.OAUTH_STATE_PARAM_LENGTH);

        const params = {
            state,
            response_type: OAUTH_RESPONSE_TYPE_CODE,
            client_id: this.config.clientId,
            scope: this.config.scopeOauthLogin,
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

    public async fetchArtistDetails(accessToken: string, artistId: string): Promise<SpotifyArtistDetailsDto> {
        validateNotBlank(accessToken, "accessToken");
        validateNotBlank(artistId, "artistId");

        const url = `${this.config.artistDetailsUrl}/${artistId}`;

        const response = await http.get<SpotifyArtistDetailsApiDto>(url, {
            headers: { 
                [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
                [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BEARER} ${accessToken}`,
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
            }
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while getting artist details");
        }
    
        return SpotifyApiResponseConverter.convertArtistDetailsApiResponse(response.body);
    }

    public async fetchSeveralArtistDetails(accessToken: string, artistIds: string[]): Promise<SpotifyArtistDetailsDto[]> {
        validateNotBlank(accessToken, "accessToken");
        validateNotNull(artistIds, "artistIds");

        if (artistIds.length === 0) {
            return [];
        }

        const url = `${this.config.artistDetailsUrl}?ids=${artistIds.join(",")}`;

        const response = await http.get<SpotifySeveralArtistDetailsApiResponseDto>(url, {
            headers: { 
                [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
                [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BEARER} ${accessToken}`,
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
            }
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while getting several artist details");
        }
    
        return SpotifyApiResponseConverter.convertSeveralArtistDetailsApiResponse(response.body);
    }

    public async getRecentlyPlayedTracks(accessToken: string, requestSize: number, before?: number): Promise<SpotifyRecentlyPlayedTracksResponseDto> {
        validateNotBlank(accessToken, "accessToken");
        validateNotNull(requestSize, "requestSize");

        return this.fetchRecentlyPlayedTracksBatch(accessToken, requestSize, before);
    }

    private async fetchRecentlyPlayedTracksBatch(accessToken: string, limit: number, before?: number): Promise<SpotifyRecentlyPlayedTracksResponseDto> {
        const queryParams: Record<string, any> = { limit };
    
        if (before) {
            queryParams['before'] = before;
        }
    
        const queryString = getQueryString(queryParams);
        const url = `${this.config.recentlyPlayedTracksUrl}?${queryString}`;
        console.log(`requesting tracks: ${url}`);
        const response = await http.get<SpotifyRecentlyPlayedTracksApiResponseDto>(url, {
            headers: { 
                [HEADER.ACCEPT]: CONTENT_TYPE.JSON,
                [HEADER.AUTHORIZATION]: `${AUTHORIZATION.BEARER} ${accessToken}`,
                [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
            }
        });
    
        if (response.statusCode !== HTTP_STATUS.OK) {
            throw new Error("something went wrong while getting the recently played tracks");
        }
    
        return SpotifyApiResponseConverter.convertRecentlyPlayedTracksApiResponse(response.body);
    }

    private validateConfig(): void {
        validateNotBlank(this.config.clientId, "config.clientId");
        validateNotBlank(this.config.clientSecret, "config.clientSecret");
        validateNotBlank(this.config.redirectUrl, "config.redirectUrl");
        validateNotBlank(this.config.authorizeUrl, "config.authorizeUrl");
        validateNotBlank(this.config.recentlyPlayedTracksUrl, "config.recentlyPlayedTracksUrl");
        validateNotBlank(this.config.userProfileUrl, "config.userProfileUrl");
        validateNotBlank(this.config.tokenUrl, "config.tokenUrl");
        validateNotBlank(this.config.artistDetailsUrl, "config.artistDetailsUrl");
        validateNotBlank(this.config.scopeOauthLogin, "config.scopeOauthLogin");
        validateNotBlank(this.config.scopeRecentlyPlayedTracks, "config.scopeRecentlyPlayedTracks");
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