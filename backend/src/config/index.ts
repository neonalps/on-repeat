import { ApiConfig } from "@src/api/config";
import { TokenConfig } from "@src/modules/auth/service";
import { SpotifyClientConfig } from "@src/modules/music-provider/spotify/client";
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
const spotifyClientId = env.get("SPOTIFY_CLIENT_ID").required().asString();
const spotifyClientSecret = env.get("SPOTIFY_CLIENT_SECRET").required().asString();
const spotifyRedirectUrl = env.get("SPOTIFY_REDIRECT_URL").required().asString();
const spotifyAuthorizeUrl = env.get("SPOTIFY_AUTHORIZE_URL").required().asString();
const spotifyTokenUrl = env.get("SPOTIFY_TOKEN_URL").required().asString();
const spotifyUserProfileUrl = env.get("SPOTIFY_USER_PROFILE_URL").required().asString();
const spotifyRecentlyPlayedUrl = env.get("SPOTIFY_RECENTLY_PLAYED_TRACKS_URL").required().asString();

const apiConfig: ApiConfig = {
    baseUrl: apiBaseUrlV1,
    albumsPath: apiAlbumsPath,
    artistsPath: apiArtistsPath,
    tracksPath: apiTracksPath,
};

const spotifyClientConfig: SpotifyClientConfig = {
    clientId: spotifyClientId,
    clientSecret: spotifyClientSecret,
    redirectUrl: spotifyRedirectUrl,
    authorizeUrl: spotifyAuthorizeUrl,
    tokenUrl: spotifyTokenUrl,
    userProfileUrl: spotifyUserProfileUrl,
    recentlyPlayedTracksUrl: spotifyRecentlyPlayedUrl,
};

const tokenConfig: TokenConfig = {
    accessTokenValiditySeconds,
    audience: authTokenAudience,
    issuer: authTokenIssuer,
    signingKey: authTokenSigningKey,
};

export const getApiConfig = () => apiConfig;
export const getNodeEnv = () => nodeEnv;
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