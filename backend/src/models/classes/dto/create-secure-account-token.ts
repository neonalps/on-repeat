export class CreateSecureAccountTokenDto {
    private _accountId!: number;
    private _publicId!: string;
    private _oauthProvider!: string;
    private _scope!: string;
    private _encryptedAccessToken!: string;
    private _accessTokenExpiresAt!: Date;
    private _encryptedRefreshToken!: string;
 
    constructor(builder: CreateSecureAccountTokenDtoBuilder) {
       this._accountId = builder.accountId;
       this._publicId = builder.publicId;
       this._oauthProvider = builder.oauthProvider;
       this._scope = builder.scope;
       this._encryptedAccessToken = builder.encryptedAccessToken;
       this._accessTokenExpiresAt = builder.accessTokenExpiresAt;
       this._encryptedRefreshToken = builder.encryptedRefreshToken;
    }
 
    public get accountId(): number {
       return this._accountId;
    }

    public get publicId(): string {
      return this._publicId;
    }
 
    public get oauthProvider(): string {
       return this._oauthProvider;
    }
 
    public get scope(): string {
       return this._scope;
    }
 
    public get encryptedAccessToken(): string {
       return this._encryptedAccessToken;
    }
 
    public get accessTokenExpiresAt(): Date {
       return this._accessTokenExpiresAt;
    }
 
    public get encryptedRefreshToken(): string {
       return this._encryptedRefreshToken;
    }
 
    public static get Builder(): CreateSecureAccountTokenDtoBuilder {
       return new CreateSecureAccountTokenDtoBuilder();
    }
 }
 
 class CreateSecureAccountTokenDtoBuilder {
    private _accountId!: number;
    private _publicId!: string;
    private _oauthProvider!: string;
    private _scope!: string;
    private _encryptedAccessToken!: string;
    private _accessTokenExpiresAt!: Date;
    private _encryptedRefreshToken!: string;
 
    public withAccountId(accountId: number): CreateSecureAccountTokenDtoBuilder {
       this._accountId = accountId;
       return this;
    }

    public withPublicId(publicId: string): CreateSecureAccountTokenDtoBuilder {
      this._publicId = publicId;
      return this;
    }
 
    public withOauthProvider(oauthProvider: string): CreateSecureAccountTokenDtoBuilder {
       this._oauthProvider = oauthProvider;
       return this;
    }
 
    public withScope(scope: string): CreateSecureAccountTokenDtoBuilder {
       this._scope = scope;
       return this;
    }
 
    public withEncryptedAccessToken(encryptedAccessToken: string): CreateSecureAccountTokenDtoBuilder {
       this._encryptedAccessToken = encryptedAccessToken;
       return this;
    }
 
    public withAccessTokenExpiresAt(accessTokenExpiresAt: Date): CreateSecureAccountTokenDtoBuilder {
       this._accessTokenExpiresAt = accessTokenExpiresAt;
       return this;
    }
 
    public withEncryptedRefreshToken(encryptedRefreshToken: string): CreateSecureAccountTokenDtoBuilder {
       this._encryptedRefreshToken = encryptedRefreshToken;
       return this;
    }
 
    public get accountId(): number {
       return this._accountId;
    }

    public get publicId(): string {
      return this._publicId;
    }
 
    public get oauthProvider(): string {
       return this._oauthProvider;
    }
 
    public get scope(): string {
       return this._scope;
    }
 
    public get encryptedAccessToken(): string {
       return this._encryptedAccessToken;
    }
 
    public get accessTokenExpiresAt(): Date {
       return this._accessTokenExpiresAt;
    }
 
    public get encryptedRefreshToken(): string {
       return this._encryptedRefreshToken;
    }
 
    build(): CreateSecureAccountTokenDto {
       return new CreateSecureAccountTokenDto(this);
    }
 }