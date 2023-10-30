import { AccountTokenMapper } from "./mapper";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { CryptoService } from "@src/modules/crypto/service";
import { requireNonNull } from "@src/util/common";
import { CreateAccountTokenDto } from "@src/models/classes/dto/create-account-token";
import { CreateSecureAccountTokenDto } from "@src/models/classes/dto/create-secure-account-token";
import { AccountTokenDao } from "@src/models/classes/dao/account-token";
import { SecureAccountTokenDao } from "@src/models/classes/dao/secure-account-token";
import { TimeSource } from "@src/util/time";
import { IllegalStateError } from "@src/api/error/illegal-state-error";

export class AccountTokenService {

    private static readonly ACCOUNT_TOKEN_EXPIRATION_SAFETY_SECONDS = 5;

    private readonly mapper: AccountTokenMapper;
    private readonly cryptoService: CryptoService;
    private readonly timeSource: TimeSource;

    constructor(mapper: AccountTokenMapper, cryptoService: CryptoService, timeSource: TimeSource) {
        this.mapper = requireNonNull(mapper);
        this.cryptoService = requireNonNull(cryptoService);
        this.timeSource = requireNonNull(timeSource);
    }

    public async create(dto: CreateAccountTokenDto): Promise<AccountTokenDao | null> {
        validateNotNull(dto, "dto");
        validateNotNull(dto.accountId, "dto.accountId");
        validateNotBlank(dto.publicId, "dto.publicId");
        validateNotBlank(dto.oauthProvider, "dto.oauthProvider");
        validateNotBlank(dto.scope, "dto.scope");
        validateNotBlank(dto.accessToken, "dto.accessToken");
        validateNotNull(dto.accessTokenExpiresIn, "dto.accessTokenExpiresIn");
        validateNotBlank(dto.refreshToken, "dto.refreshToken");

        const sortedScopes = AccountTokenService.getSortedScopes(dto.scope);

        const existingToken = await this.getByAccountIdAndOauthProviderAndScope(dto.accountId, dto.oauthProvider, sortedScopes);
        if (existingToken !== null) {
            throw new IllegalStateError("A token with this scope already exists");
        }

        const encryptedAccessToken = this.cryptoService.encrypt(dto.accessToken);
        const encryptedRefreshToken = this.cryptoService.encrypt(dto.refreshToken);

        const accessTokenExpiresAt = this.getSafeTokenExpirationDate(dto.accessTokenExpiresIn);

        const secureAccountToken = CreateSecureAccountTokenDto.Builder
            .withPublicId(dto.publicId)
            .withAccountId(dto.accountId)
            .withOauthProvider(dto.oauthProvider)
            .withScope(sortedScopes)
            .withEncryptedAccessToken(encryptedAccessToken)
            .withAccessTokenExpiresAt(accessTokenExpiresAt)
            .withEncryptedRefreshToken(encryptedRefreshToken)
            .build();
    
        const accountTokenId = await this.mapper.create(secureAccountToken);
    
        if (!accountTokenId) {
            throw new Error("Failed to create account token");
        }
    
        return this.getById(accountTokenId);
    }
    
    public async getByAccountIdAndOauthProviderAndScope(accountId: number, oauthProvider: string, scope: string): Promise<AccountTokenDao | null> {
        validateNotNull(accountId, "accountId");
        validateNotBlank(oauthProvider, "oauthProvider");
        validateNotBlank(scope, "scope");

        const sortedScopes = AccountTokenService.getSortedScopes(scope);
    
        const secureAccountTokenDao = await this.mapper.getByAccountIdAndOauthProviderAndScope(accountId, oauthProvider, sortedScopes);
    
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

    public async getAllByAccountId(accountId: number): Promise<AccountTokenDao[]> {
        validateNotNull(accountId, "accountId");

        const secureAccountTokenDaos = await this.mapper.getByAccountId(accountId);
        
        return secureAccountTokenDaos.map(item => this.toAccountTokenDao(item));
    }
    
    public async updateAccessToken(accountTokenId: number, newAccessToken: string, newAccessTokenExpiresIn: number): Promise<void> {
        validateNotNull(accountTokenId, "accountTokenId");
        validateNotBlank(newAccessToken, "newAccessToken");
        validateNotNull(newAccessTokenExpiresIn, "newAccessTokenExpiresIn");

        const newEncryptedAccessToken = this.cryptoService.encrypt(newAccessToken);
        const newAccessTokenExpiresAt = this.getSafeTokenExpirationDate(newAccessTokenExpiresIn);

        await this.mapper.updateAccessToken(accountTokenId, newEncryptedAccessToken, newAccessTokenExpiresAt);
    }

    public async delete(publicId: string): Promise<void> {
        validateNotBlank(publicId, "publicId");

        await this.mapper.deleteByPublicId(publicId);
    }

    private static getSortedScopes(scopes: string): string {
        return scopes.split(" ").sort().join(" ");
    }

    private getSafeTokenExpirationDate(expiresIn: number): Date {
        return this.timeSource.getNowPlusSeconds(expiresIn - AccountTokenService.ACCOUNT_TOKEN_EXPIRATION_SAFETY_SECONDS);
    }

    private toAccountTokenDao(accountTokenDao: SecureAccountTokenDao): AccountTokenDao {
        const accessToken = this.cryptoService.decrypt(accountTokenDao.encryptedAccessToken);
        const refreshToken = this.cryptoService.decrypt(accountTokenDao.encryptedRefreshToken);

        return AccountTokenDao.Builder
            .withId(accountTokenDao.id)
            .withPublicId(accountTokenDao.publicId)
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