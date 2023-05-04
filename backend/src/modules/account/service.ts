import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { AccountMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";
import { AccountDao } from "@src/models/classes/dao/account";
import { CreateAccountDto } from "@src/models/classes/dto/create-account";
import { CreateSecureAccountDto } from "@src/models/classes/dto/create-secure-account";
import { CryptoService } from "@src/modules/crypto/service";
import { UuidSource } from "@src/util/uuid";

export interface GetOrCreateAccountResponse {
    account: AccountDao | null;
    wasCreated: boolean;
}

export class AccountService {

    private readonly mapper: AccountMapper;
    private readonly cryptoService: CryptoService;
    private readonly uuidSource: UuidSource;

    constructor(
        mapper: AccountMapper, 
        cryptoService: CryptoService, 
        uuidSource: UuidSource,
    ) {
        this.mapper = requireNonNull(mapper);
        this.cryptoService = requireNonNull(cryptoService);
        this.uuidSource = requireNonNull(uuidSource);
    }

    public async getOrCreate(email: string): Promise<GetOrCreateAccountResponse> {
        validateNotBlank(email, "email");
    
        const existingUser = await this.getByEmail(email);
    
        if (existingUser) {
            return {
                account: existingUser,
                wasCreated: false,
            };
        }
    
        const account: CreateAccountDto = CreateAccountDto.Builder
            .withPublicId(this.uuidSource.getRandomUuid())
            .withEmail(email)
            .withEnabled(true)
            .build();
    
        const createdAccount = await this.create(account);

        if (createdAccount === null) {
            return {
                account: null,
                wasCreated: false,
            };
        }

        return {
            account: createdAccount,
            wasCreated: true,
        };
    };
    
    public async create(dto: CreateAccountDto): Promise<AccountDao | null> {
        validateNotNull(dto, "dto");
        validateNotBlank(dto.publicId, "dto.publicId");
        validateNotBlank(dto.email, "dto.email");

        const secureAccount = CreateSecureAccountDto.Builder
            .withPublicId(dto.publicId)
            .withHashedEmail(this.cryptoService.hash(dto.email))
            .withEncryptedEmail(null)
            .withEnabled(dto.enabled)
            .build();
    
        const accountId = await this.mapper.create(secureAccount);
    
        return this.getById(accountId);
    };
    
    public async getByEmail(email: string): Promise<AccountDao | null> {
        validateNotNull(email, "email");
    
        const account = await this.mapper.getByHashedEmail(this.cryptoService.hash(email));
    
        if (account == null) {
            return null;
        }
    
        return AccountDao.fromDaoInterface(account);
    }
    
    public async getById(id: number): Promise<AccountDao | null> {
        validateNotNull(id, "id");
    
        const account = await this.mapper.getById(id);
    
        if (account == null) {
            return null;
        }
    
        return AccountDao.fromDaoInterface(account);
    };

    public async getByPublicId(publicId: string): Promise<AccountDao | null> {
        validateNotBlank(publicId, "publicId");
    
        const account = await this.mapper.getByPublicId(publicId);
    
        if (account == null) {
            return null;
        }
    
        return AccountDao.fromDaoInterface(account);
    };


}