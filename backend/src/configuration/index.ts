import dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

const cryptoKey = env.get('CRYPTO_KEY').required().asString();
const serverHost = env.get("HOST").required().asString();
const serverPort = env.get('PORT').required().asPortNumber();

export const getCryptoKey = () => cryptoKey;
export const getServerHost = () => serverHost;
export const getServerPort = () => serverPort;