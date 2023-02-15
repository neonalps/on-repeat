import mapper from "./mapper";
import { validateNotBlank } from "@src/util/validation";
import { safelyDecrypt, safelyEncrypt } from "@src/sec/service";

const getByAccountIdAndOauthProvider = async (accountId: string, oauthProvider: string): Promise<AccountToken | null> => {
    validateNotBlank(accountId, "accountId");
    validateNotBlank(oauthProvider, "oauthProvider");

    const accountTokenDao = await mapper.getByAccountIdAndOauthProvider(accountId, oauthProvider);

    if (!accountTokenDao) {
        return null;
    }

    return toDto(accountTokenDao);
};

const toDao = (dto: AccountToken): AccountTokenDao => {
    return { 
        ...dto,
        accessToken: safelyEncrypt(dto.accessToken),
        refreshToken: safelyEncrypt(dto.refreshToken),
    };
};

const toDto = (dao: AccountTokenDao): AccountToken => {
    return {
         ...dao,
         accessToken: safelyDecrypt(dao.accessToken),
         refreshToken: safelyDecrypt(dao.refreshToken),
    };
};

const service = {
    getByAccountIdAndOauthProvider,
};

export default service;