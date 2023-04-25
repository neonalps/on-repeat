import { AccountTokenMapper } from "./mapper";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { CryptoService } from "@src/crypto/service";
import { requireNonNull } from "@src/util/common";
import { CreateAccountTokenDto } from "@src/models/classes/dto/create-account-token";
import { CreateSecureAccountTokenDto } from "@src/models/classes/dto/create-secure-account-token";
import { AccountTokenDao } from "@src/models/classes/dao/account-token";
import { SecureAccountTokenDao } from "@src/models/classes/dao/secure-account-token";

export class AccountTokenService {

    private readonly mapper: AccountTokenMapper;
    private readonly cryptoService: CryptoService;

    constructor(mapper: AccountTokenMapper, cryptoService: CryptoService) {
        this.mapper = requireNonNull(mapper);
        this.cryptoService = requireNonNull(cryptoService);
    }

    public async create(dto: CreateAccountTokenDto): Promise<AccountTokenDao | null> {
        validateNotNull(dto, "dto");
        validateNotNull(dto.accountId, "dto.accountId");
        validateNotBlank(dto.oauthProvider, "dto.oauthProvider");
        validateNotBlank(dto.scope, "dto.scope");
        validateNotBlank(dto.accessToken, "dto.accessToken");
        validateNotNull(dto.accessTokenExpiresAt, "dto.accessTokenExpiresAt");
        validateNotBlank(dto.refreshToken, "dto.refreshToken");

        const encryptedAccessToken = this.cryptoService.encrypt(dto.accessToken);
        const encryptedRefreshToken = this.cryptoService.encrypt(dto.refreshToken);

        const secureAccountToken = CreateSecureAccountTokenDto.Builder
            .withAccountId(dto.accountId)
            .withOauthProvider(dto.oauthProvider)
            .withScope(dto.scope)
            .withEncryptedAccessToken(encryptedAccessToken)
            .withAccessTokenExpiresAt(dto.accessTokenExpiresAt)
            .withEncryptedRefreshToken(encryptedRefreshToken)
            .build();
    
        const accountTokenId = await this.mapper.create(secureAccountToken);
    
        if (!accountTokenId) {
            throw new Error("Failed to create account token");
        }
    
        return this.getById(accountTokenId);
    }
    
    public async deleteByAccountIdAndOauthProviderAndScope(accountId: string, oauthProvider: string, scope: string): Promise<void> {
        // TODO implement
    }
    
    public async getByAccountIdAndOauthProviderAndScope(accountId: string, oauthProvider: string, scope: string): Promise<AccountTokenDao | null> {
        validateNotBlank(accountId, "accountId");
        validateNotBlank(oauthProvider, "oauthProvider");
        validateNotBlank(scope, "scope");
    
        const secureAccountTokenDao = await this.mapper.getByAccountIdAndOauthProviderAndScope(accountId, oauthProvider, scope);
    
        if (!secureAccountTokenDao) {
            return null;
        }
    
        return this.toAccountTokenDao(secureAccountTokenDao);
    }
    
    public async getById(accountTokenId: number): Promise<AccountTokenDao | null> {
        validateNotNull(accountTokenId, "accountTokenId");
    
        const secureAccountTokenDao = await this.mapper.getById(accountTokenId);
    
        if (!secureAccountTokenDao) {
            return null;
        }
    
        return this.toAccountTokenDao(secureAccountTokenDao);
    }
    
    public async updateAccessToken(accountTokenId: number, newAccessToken: string, newAccessTokenExpiresAt: Date): Promise<boolean> {
        // TODO implement
    }

    private toAccountTokenDao(accountTokenDao: SecureAccountTokenDao): AccountTokenDao {
        const accessToken = this.cryptoService.decrypt(accountTokenDao.encryptedAccessToken);
        const refreshToken = this.cryptoService.decrypt(accountTokenDao.encryptedRefreshToken);

        return AccountTokenDao.Builder
            .withId(accountTokenDao.id)
            .withAccountId(accountTokenDao.accountId)
            .withOauthProvider(accountTokenDao.oauthProvider)
            .withScope(accountTokenDao.scope)
            .withAccessToken(accessToken)
            .withAccessTokenExpiresAt(accountTokenDao.accessTokenExpiresAt)
            .withRefreshToken(refreshToken)
            .withCreatedAt(accountTokenDao.createdAt)
            .withUpdatedAt(accountTokenDao.updatedAt)
            .build();
    }

}