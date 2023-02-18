import mapper from "./mapper";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { decrypt, encrypt } from "@src/sec/service";

const create = async (accountToken: CreateAccountTokenDto): Promise<AccountToken | null> => {
    validateNotNull(accountToken, "accountToken");
    validateNotBlank(accountToken.accountId, "accountToken.accountId");
    validateNotBlank(accountToken.oauthProvider, "accountToken.oauthProvider");
    validateNotBlank(accountToken.scope, "accountToken.scope");
    validateNotBlank(accountToken.accessToken, "accountToken.accessToken");
    validateNotNull(accountToken.accessTokenExpiresAt, "accountToken.accessTokenExpiresAt");
    validateNotBlank(accountToken.refreshToken, "accountToken.refreshToken");

    const accountTokenId = await mapper.create({
        ...accountToken,
        accessToken: encrypt(accountToken.accessToken),
        refreshToken: encrypt(accountToken.refreshToken)
    });

    if (!accountTokenId) {
        throw new Error("Failed to create account token");
    }

    return getById(accountTokenId);
};

const deleteByAccountIdAndOauthProviderAndScope = async (accountId: string, oauthProvider: string, scope: string): Promise<void> => {

};

const getByAccountIdAndOauthProviderAndScope = async (accountId: string, oauthProvider: string, scope: string): Promise<AccountToken | null> => {
    validateNotBlank(accountId, "accountId");
    validateNotBlank(oauthProvider, "oauthProvider");
    validateNotBlank(scope, "scope");

    const accountTokenDao = await mapper.getByAccountIdAndOauthProviderAndScope(accountId, oauthProvider, scope);

    if (!accountTokenDao) {
        return null;
    }

    return toDto(accountTokenDao);
};

const getById = async (accountTokenId: number): Promise<AccountToken | null> => {
    validateNotNull(accountTokenId, "accountTokenId");

    const accountTokenDao = await mapper.getById(accountTokenId);

    if (!accountTokenDao) {
        return null;
    }

    return toDto(accountTokenDao);
};

const toDto = (dao: AccountTokenDao): AccountToken => {
    return {
         ...dao,
         accessToken: decrypt(dao.accessToken),
         refreshToken: decrypt(dao.refreshToken),
    };
};

const service = {
    create,
    getByAccountIdAndOauthProviderAndScope,
};

export default service;