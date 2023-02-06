import jwt from "jsonwebtoken";
import { getAuthTokenAudience, getAuthTokenIssuer, getAccessTokenValiditySeconds, getAuthTokenSigningKey } from "@src/config";
import { getCurrentUnixTimestamp } from "@src/util/time";

const AUTH_TOKEN_SIGNING_KEY = getAuthTokenSigningKey();
const ACCESS_TOKEN_VALIDITY_SECONDS = getAccessTokenValiditySeconds();

const SCOPE_KEY_USER = "user";

const createSignedAccessToken = (subject: string): string => {
    return signToken(issueAccessToken(subject));
};

const issueAccessToken = (subject: string): AccessToken => {
    const now = getCurrentUnixTimestamp();
    const expiresAt = now + ACCESS_TOKEN_VALIDITY_SECONDS;

    return {
        tokenType: "ACCESS",
        sub: subject,
        iss: getAuthTokenIssuer(),
        aud: getAuthTokenAudience(),
        scp: [SCOPE_KEY_USER],
        iat: now,
        nbf: now,
        exp: expiresAt,
    };
};

const signToken = (token: AccessToken): string => {
    return jwt.sign(token, AUTH_TOKEN_SIGNING_KEY);
};

const service = {
    createSignedAccessToken,
};

export default service;