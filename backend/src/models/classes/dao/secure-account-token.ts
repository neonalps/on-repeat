import { AccountTokenDaoInterface } from "@src/models/dao/account-token.dao";

export class SecureAccountTokenDao {
    private _id!: number;
    private _publicId!: string;
    private _accountId!: number;
    private _oauthProvider!: string;
    private _scope!: string;
    private _encryptedAccessToken!: string;
    private _accessTokenExpiresAt!: Date;
    private _encryptedRefreshToken!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    constructor(builder: SecureAccountTokenDaoBuilder) {
       this._id = builder.id;
       this._publicId = builder.publicId;
       this._accountId = builder.accountId;
       this._oauthProvider = builder.oauthProvider;
       this._scope = builder.scope;
       this._encryptedAccessToken = builder.encryptedAccessToken;
       this._accessTokenExpiresAt = builder.accessTokenExpiresAt;
       this._encryptedRefreshToken = builder.encryptedRefreshToken;
       this._createdAt = builder.createdAt;
       this._updatedAt = builder.updatedAt;
    }
 
    public get id(): number {
       return this._id;
    }

    public get publicId(): string {
      return this._publicId;
    }
 
    public get accountId(): number {
       return this._accountId;
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
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    public static get Builder(): SecureAccountTokenDaoBuilder {
       return new SecureAccountTokenDaoBuilder();
    }

    public static fromDaoInterface(item: AccountTokenDaoInterface): SecureAccountTokenDao | null {
        if (!item) {
            return null;
        }

        return this.Builder
            .withId(item.id)
            .withPublicId(item.publicId)
            .withAccountId(item.accountId)
            .withOauthProvider(item.oauthProvider)
            .withScope(item.scope)
            .withEncryptedAccessToken(item.encryptedAccessToken)
            .withAccessTokenExpiresAt(item.accessTokenExpiresAt)
            .withEncryptedRefreshToken(item.encryptedRefreshToken)
            .withCreatedAt(item.createdAt)
            .withUpdatedAt(item.updatedAt)
            .build();
    }
 }
 
 class SecureAccountTokenDaoBuilder {
    private _id!: number;
    private _publicId!: string;
    private _accountId!: number;
    private _oauthProvider!: string;
    private _scope!: string;
    private _encryptedAccessToken!: string;
    private _accessTokenExpiresAt!: Date;
    private _encryptedRefreshToken!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    public withId(id: number): SecureAccountTokenDaoBuilder {
       this._id = id;
       return this;
    }

    public withPublicId(publicId: string): SecureAccountTokenDaoBuilder {
      this._publicId = publicId;
      return this;
    }
 
    public withAccountId(accountId: number): SecureAccountTokenDaoBuilder {
       this._accountId = accountId;
       return this;
    }
 
    public withOauthProvider(oauthProvider: string): SecureAccountTokenDaoBuilder {
       this._oauthProvider = oauthProvider;
       return this;
    }
 
    public withScope(scope: string): SecureAccountTokenDaoBuilder {
       this._scope = scope;
       return this;
    }
 
    public withEncryptedAccessToken(encryptedAccessToken: string): SecureAccountTokenDaoBuilder {
       this._encryptedAccessToken = encryptedAccessToken;
       return this;
    }
 
    public withAccessTokenExpiresAt(accessTokenExpiresAt: Date): SecureAccountTokenDaoBuilder {
       this._accessTokenExpiresAt = accessTokenExpiresAt;
       return this;
    }
 
    public withEncryptedRefreshToken(encryptedRefreshToken: string): SecureAccountTokenDaoBuilder {
       this._encryptedRefreshToken = encryptedRefreshToken;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): SecureAccountTokenDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public withUpdatedAt(updatedAt: Date | null): SecureAccountTokenDaoBuilder {
       this._updatedAt = updatedAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }

    public get publicId(): string {
      return this._publicId;
    }
 
    public get accountId(): number {
       return this._accountId;
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
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    build(): SecureAccountTokenDao {
       return new SecureAccountTokenDao(this);
    }
 }