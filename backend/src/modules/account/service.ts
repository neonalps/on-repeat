import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { getUuid } from "@src/util/uuid";
import { AccountMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";
import { AccountDao } from "@src/models/classes/dao/account";
import { CreateAccountDto } from "@src/models/classes/dto/create-account";
import { CreateSecureAccountDto } from "@src/models/classes/dto/create-secure-account";
import { CryptoService } from "@src/crypto/service";

export class AccountService {

    private readonly mapper: AccountMapper;
    private readonly cryptoService: CryptoService;

    constructor(mapper: AccountMapper, cryptoService: CryptoService) {
        this.mapper = requireNonNull(mapper);
        this.cryptoService = requireNonNull(cryptoService);
    }

    public async getOrCreate(email: string): Promise<AccountDao | null> {
        validateNotBlank(email, "email");
    
        const existingUser = await this.getByEmail(email);
    
        if (existingUser) {
            return existingUser;
        }
    
        const account: CreateAccountDto = CreateAccountDto.Builder
            .withPublicId(getUuid())
            .withEmail(email)
            .withEnabled(true)
            .build();
    
        return this.create(account);
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