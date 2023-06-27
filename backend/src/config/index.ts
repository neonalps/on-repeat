import { ApiConfig } from "@src/api/config";
import { CorsConfig } from "@src/cors/manager";
import { HttpMethod } from "@src/http/constants";
import { TokenConfig } from "@src/modules/auth/service";
import { SpotifyClientConfig } from "@src/modules/music-provider/spotify/client";
import { checkValidHttpMethod, getAllowedHttpMethods } from "@src/util/common";
import dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

const nodeEnv = env.get('NODE_ENV').required().asString();
const cryptoKey = env.get('CRYPTO_KEY').required().asString();
const dbConnectionUrl = env.get('DB_CONNECTION_URL').required().asString();
const serverHost = env.get("HOST").required().asString();
const serverPort = env.get('PORT').required().asPortNumber();
const accessTokenValiditySeconds = env.get("ACCESS_TOKEN_VALIDITY_SECONDS").required().asIntPositive();
const apiAlbumsPath = env.get('API_ALBUMS_PATH').required().asString();
const apiArtistsPath = env.get('API_ARTISTS_PATH').required().asString();
const apiTracksPath = env.get('API_TRACKS_PATH').required().asString();
const apiBaseUrlV1 = env.get('API_BASE_URL_V1').required().asString();
const authTokenAudience = env.get("AUTH_TOKEN_AUDIENCE").required().asString();
const authTokenIssuer = env.get("AUTH_TOKEN_ISSUER").required().asString();
const authTokenSigningKey = env.get("AUTH_TOKEN_SIGNING_KEY").required().asString();
const corsAllowedMethods = env.get("CORS_ALLOWED_METHODS").required().asString();
const corsAllowedOrigins = env.get("CORS_ALLOWED_ORIGINS").required().asString();
const spotifyClientId = env.get("SPOTIFY_CLIENT_ID").required().asString();
const spotifyClientSecret = env.get("SPOTIFY_CLIENT_SECRET").required().asString();
const spotifyRedirectUrl = env.get("SPOTIFY_REDIRECT_URL").required().asString();
const spotifyAuthorizeUrl = env.get("SPOTIFY_AUTHORIZE_URL").required().asString();
const spotifyTokenUrl = env.get("SPOTIFY_TOKEN_URL").required().asString();
const spotifyUserProfileUrl = env.get("SPOTIFY_USER_PROFILE_URL").required().asString();
const spotifyRecentlyPlayedUrl = env.get("SPOTIFY_RECENTLY_PLAYED_TRACKS_URL").required().asString();
const spotifyArtistDetailsUrl = env.get("SPOTIFY_ARTIST_DETAILS_URL").required().asString();
const spotifyScopeOauthLogin = env.get("SPOTIFY_SCOPE_OAUTH_LOGIN").required().asString();
const spotifyScopeRecentlyPlayedTracks = env.get("SPOTIFY_SCOPE_RECENTLY_PLAYED_TRACKS").required().asString();

const apiConfig: ApiConfig = {
    baseUrl: apiBaseUrlV1,
    albumsPath: apiAlbumsPath,
    artistsPath: apiArtistsPath,
    tracksPath: apiTracksPath,
};

const parseAllowedMethods = (methods: string): HttpMethod[] => {
    const methodStrings = methods.split(",");

    if (!methodStrings.every(method => checkValidHttpMethod(method))) {
        throw new Error(`Illegal value in allowed CORS methods detected. All values must be one of: ${getAllowedHttpMethods().join(", ")}`);
    }

    return methodStrings as HttpMethod[];
};

const corsConfig: CorsConfig = {
    allowedOrigins: corsAllowedOrigins.split(","),
    allowedMethods: parseAllowedMethods(corsAllowedMethods),
};

const spotifyClientConfig: SpotifyClientConfig = {
    clientId: spotifyClientId,
    clientSecret: spotifyClientSecret,
    redirectUrl: spotifyRedirectUrl,
    authorizeUrl: spotifyAuthorizeUrl,
    tokenUrl: spotifyTokenUrl,
    userProfileUrl: spotifyUserProfileUrl,
    recentlyPlayedTracksUrl: spotifyRecentlyPlayedUrl,
    artistDetailsUrl: spotifyArtistDetailsUrl,
    scopeOauthLogin: spotifyScopeOauthLogin,
    scopeRecentlyPlayedTracks: spotifyScopeRecentlyPlayedTracks,
};

const tokenConfig: TokenConfig = {
    accessTokenValiditySeconds,
    audience: authTokenAudience,
    issuer: authTokenIssuer,
    signingKey: authTokenSigningKey,
};

export const getApiConfig = () => apiConfig;
export const getNodeEnv = () => nodeEnv;
export const getCorsConfig = () => corsConfig;
export const getCryptoKey = () => cryptoKey;
export const getDbConnectionUrl = () => dbConnectionUrl;
export const getServerHost = () => serverHost;
export const getServerPort = () => serverPort;
export const getAccessTokenValiditySeconds = () => accessTokenValiditySeconds;
export const getAuthTokenAudience = () => authTokenAudience;
export const getAuthTokenIssuer = () => authTokenIssuer;
export const getAuthTokenSigningKey = () => authTokenSigningKey;
export const getSpotifyClientConfig = () => spotifyClientConfig;
export const getTokenConfig = () => tokenConfig;