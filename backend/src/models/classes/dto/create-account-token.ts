export class CreateAccountTokenDto {
   private _accountId!: number;
   private _oauthProvider!: string;
   private _scope!: string;
   private _accessToken!: string;
   private _accessTokenExpiresAt!: Date;
   private _refreshToken!: string;

   constructor(builder: CreateAccountTokenDtoBuilder) {
      this._accountId = builder.accountId;
      this._oauthProvider = builder.oauthProvider;
      this._scope = builder.scope;
      this._accessToken = builder.accessToken;
      this._accessTokenExpiresAt = builder.accessTokenExpiresAt;
      this._refreshToken = builder.refreshToken;
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

   public static get Builder(): CreateAccountTokenDtoBuilder {
      return new CreateAccountTokenDtoBuilder();
   }
}

class CreateAccountTokenDtoBuilder {
   private _accountId!: number;
   private _oauthProvider!: string;
   private _scope!: string;
   private _accessToken!: string;
   private _accessTokenExpiresAt!: Date;
   private _refreshToken!: string;

   public withAccountId(accountId: number): CreateAccountTokenDtoBuilder {
      this._accountId = accountId;
      return this;
   }

   public withOauthProvider(oauthProvider: string): CreateAccountTokenDtoBuilder {
      this._oauthProvider = oauthProvider;
      return this;
   }

   public withScope(scope: string): CreateAccountTokenDtoBuilder {
      this._scope = scope;
      return this;
   }

   public withAccessToken(accessToken: string): CreateAccountTokenDtoBuilder {
      this._accessToken = accessToken;
      return this;
   }

   public withAccessTokenExpiresAt(accessTokenExpiresAt: Date): CreateAccountTokenDtoBuilder {
      this._accessTokenExpiresAt = accessTokenExpiresAt;
      return this;
   }

   public withRefreshToken(refreshToken: string): CreateAccountTokenDtoBuilder {
      this._refreshToken = refreshToken;
      return this;
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

   build(): CreateAccountTokenDto {
      return new CreateAccountTokenDto(this);
   }
}