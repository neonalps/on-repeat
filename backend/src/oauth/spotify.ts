import { getSpotifyClientId, getSpotifyClientSecret, getSpotifyRedirectUrl } from "@src/config";
import { AUTHORIZATION, CONTENT_TYPE, HEADER, HTTP_STATUS } from "@src/http/constants";
import { generateRandomString, getQueryString } from "@src/util/common";
import { OAUTH_GRANT_TYPE_AUTHORIZATION_CODE, OAUTH_GRANT_TYPE_REFRESH_TOKEN, OAUTH_RESPONSE_TYPE_CODE } from "./constants";
import http from "@src/http/index";

const OAUTH_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const OAUTH_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const OAUTH_USER_PROFILE_URL = 'https://api.spotify.com/v1/me';

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
        // TODO improve error handling (create extended error class?)
        throw new Error("something went wrong while getting new access token");
    }

    const responseBody = response.body;

    // TODO check whether response body is present

    return {
        accessToken: responseBody.access_token,
        expiresIn: responseBody.expires_in,
        scope: responseBody.scope,
        tokenType: responseBody.token_type,
    };
}

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