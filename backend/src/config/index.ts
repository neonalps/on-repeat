import dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

const nodeEnv = env.get('NODE_ENV').required().asString();
const cryptoKey = env.get('CRYPTO_KEY').required().asString();
const dbConnectionUrl = env.get('DB_CONNECTION_URL').required().asString();
const serverHost = env.get("HOST").required().asString();
const serverPort = env.get('PORT').required().asPortNumber();
const accessTokenValiditySeconds = env.get("ACCESS_TOKEN_VALIDITY_SECONDS").required().asIntPositive();
const authTokenAudience = env.get("AUTH_TOKEN_AUDIENCE").required().asString();
const authTokenIssuer = env.get("AUTH_TOKEN_ISSUER").required().asString();
const authTokenSigningKey = env.get("AUTH_TOKEN_SIGNING_KEY").required().asString();
const spotifyClientId = env.get("SPOTIFY_CLIENT_ID").required().asString();
const spotifyClientSecret = env.get("SPOTIFY_CLIENT_SECRET").required().asString();
const spotifyRedirectUrl = env.get("SPOTIFY_REDIRECT_URL").required().asString();

export const getNodeEnv = () => nodeEnv;
export const getCryptoKey = () => cryptoKey;
export const getDbConnectionUrl = () => dbConnectionUrl;
export const getServerHost = () => serverHost;
export const getServerPort = () => serverPort;
export const getAccessTokenValiditySeconds = () => accessTokenValiditySeconds;
export const getAuthTokenAudience = () => authTokenAudience;
export const getAuthTokenIssuer = () => authTokenIssuer;
export const getAuthTokenSigningKey = () => authTokenSigningKey;
export const getSpotifyClientId = () => spotifyClientId;
export const getSpotifyClientSecret = () => spotifyClientSecret;
export const getSpotifyRedirectUrl = () => spotifyRedirectUrl;