import { getSpotifyClientId, getSpotifyClientSecret, getSpotifyRedirectUrl } from "@src/config";
import axios from "axios";
import qs from "qs";

const OAUTH_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const OAUTH_TOKEN_URL = 'https://accounts.spotify.com/api/token';

const OAUTH_SCOPE = "user-read-private user-read-email user-read-recently-played";

const clientId = getSpotifyClientId();
const clientSecret = getSpotifyClientSecret();
const redirectUrl = getSpotifyRedirectUrl();

export const getAuthorizeUrl = (state: string): string => {
    const params = {
        state,
        response_type: "code",
        client_id: clientId,
        scope: OAUTH_SCOPE,
        redirect_uri: redirectUrl
    };
    
    const queryParams: string = new URLSearchParams(params).toString();
    return `${OAUTH_AUTHORIZE_URL}?${queryParams}`;
};

export const exchangeCodeForToken = async (code: string): Promise<OauthTokenResponse> => {
    const headers = { 
        'Accept': 'application/json',
        'Authorization': `Basic ${getAuthHeader(clientId, clientSecret)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await axios({
            method: 'post',
            url: OAUTH_TOKEN_URL,
            data: new URLSearchParams({
                code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUrl,
            }),
            headers,
        });
        console.log('response', response.data);
    } catch (ex) {
        console.error(ex);
    } finally {
        return {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            expiresIn: 3600,
            scope: 'scope',
            tokenType: 'access'
        };
    }

    
    //const body = await response.body.json().data as OauthTokenResponse;
    //return body;
};

export const getAuthHeader = (id: string, secret: string): string => {
    return Buffer.from(`${id}:${secret}`, 'utf8').toString('base64');
};

export const getCodeExchangeParams = (dto: CodeExchangeDto): URLSearchParams => {
    return new URLSearchParams({
        code: dto.code,
        redirect_uri: dto.redirectUrl,
        grant_type: dto.grantType
    });
};