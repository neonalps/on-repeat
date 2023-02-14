import { getSpotifyClientId, getSpotifyClientSecret, getSpotifyRedirectUrl } from "@src/config";
import { generateRandomString, HTTP_STATUS } from "@src/util/common";
import { request } from "undici";

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
        response_type: "code",
        client_id: clientId,
        scope: OAUTH_SCOPE_EMAIL,
        redirect_uri: redirectUrl
    };
    return `${OAUTH_AUTHORIZE_URL}?${getQueryString(params)}`;
};

export const exchangeCodeForToken = async (code: string): Promise<OauthTokenResponse> => {
    const { statusCode, body: response } = await request(OAUTH_TOKEN_URL, {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Authorization': `Basic ${getAuthHeader(clientId, clientSecret)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: getCodeExchangeParams(code)
    });

    if (statusCode !== HTTP_STATUS.OK) {
        // TODO improve error handling (create extended error class?)
        throw new Error("something went wrong while exchanging code for token");
    }

    const responseBody = await response.json() as OauthTokenResponseDto;

    return {
        accessToken: responseBody.access_token,
        refreshToken: responseBody.refresh_token,
        expiresIn: responseBody.expires_in,
        scope: responseBody.scope,
        tokenType: responseBody.token_type,
    };
};

export const getUserProfile = async (accessToken: string): Promise<UserProfile> => {
    const { statusCode, body: response } = await request(OAUTH_USER_PROFILE_URL, {
        method: 'GET',
        headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    if (statusCode !== HTTP_STATUS.OK) {
        // TODO improve error handling (create extended error class?)
        throw new Error("something went wrong while getting the user profile");
    }

    const responseBody = await response.json() as GetUserProfileResponseDto;

    return {
        id: responseBody.id,
        email: responseBody.email,
        displayName: responseBody.display_name,
        href: responseBody.href,
    };
}

export const getAuthHeader = (id: string, secret: string): string => {
    return Buffer.from(`${id}:${secret}`, 'utf8').toString('base64');
};

const getQueryString = (params: Record<string, string>): string => {
    return new URLSearchParams(params).toString();
};

const getCodeExchangeParams = (code: string): string => {
    return getQueryString({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUrl,
    });
}