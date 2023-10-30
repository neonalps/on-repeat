export class AccountTokenDao {
    private _id!: number;
    private _publicId!: string;
    private _accountId!: number;
    private _oauthProvider!: string;
    private _scope!: string;
    private _accessToken!: string;
    private _accessTokenExpiresAt!: Date;
    private _refreshToken!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    constructor(builder: AccountTokenDaoBuilder) {
       this._id = builder.id;
       this._publicId = builder.publicId;
       this._accountId = builder.accountId;
       this._oauthProvider = builder.oauthProvider;
       this._scope = builder.scope;
       this._accessToken = builder.accessToken;
       this._accessTokenExpiresAt = builder.accessTokenExpiresAt;
       this._refreshToken = builder.refreshToken;
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
 
    public get accessToken(): string {
       return this._accessToken;
    }
 
    public get accessTokenExpiresAt(): Date {
       return this._accessTokenExpiresAt;
    }
 
    public get refreshToken(): string {
       return this._refreshToken;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    public static get Builder(): AccountTokenDaoBuilder {
       return new AccountTokenDaoBuilder();
    }
 }
 
 class AccountTokenDaoBuilder {
    private _id!: number;
    private _publicId!: string;
    private _accountId!: number;
    private _oauthProvider!: string;
    private _scope!: string;
    private _accessToken!: string;
    private _accessTokenExpiresAt!: Date;
    private _refreshToken!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    public withId(id: number): AccountTokenDaoBuilder {
       this._id = id;
       return this;
    }

    public withPublicId(publicId: string): AccountTokenDaoBuilder {
      this._publicId = publicId;
      return this;
    }
 
    public withAccountId(accountId: number): AccountTokenDaoBuilder {
       this._accountId = accountId;
       return this;
    }
 
    public withOauthProvider(oauthProvider: string): AccountTokenDaoBuilder {
       this._oauthProvider = oauthProvider;
       return this;
    }
 
    public withScope(scope: string): AccountTokenDaoBuilder {
       this._scope = scope;
       return this;
    }
 
    public withAccessToken(accessToken: string): AccountTokenDaoBuilder {
       this._accessToken = accessToken;
       return this;
    }
 
    public withAccessTokenExpiresAt(accessTokenExpiresAt: Date): AccountTokenDaoBuilder {
       this._accessTokenExpiresAt = accessTokenExpiresAt;
       return this;
    }
 
    public withRefreshToken(refreshToken: string): AccountTokenDaoBuilder {
       this._refreshToken = refreshToken;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): AccountTokenDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public withUpdatedAt(updatedAt: Date | null): AccountTokenDaoBuilder {
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
 
    public get accessToken(): string {
       return this._accessToken;
    }
 
    public get accessTokenExpiresAt(): Date {
       return this._accessTokenExpiresAt;
    }
 
    public get refreshToken(): string {
       return this._refreshToken;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    build(): AccountTokenDao {
       return new AccountTokenDao(this);
    }
 }