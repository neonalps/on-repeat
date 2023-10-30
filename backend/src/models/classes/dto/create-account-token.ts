export class CreateAccountTokenDto {
   private _accountId!: number;
   private _publicId!: string;
   private _oauthProvider!: string;
   private _scope!: string;
   private _accessToken!: string;
   private _accessTokenExpiresIn!: number;
   private _refreshToken!: string;

   constructor(builder: CreateAccountTokenDtoBuilder) {
      this._accountId = builder.accountId;
      this._publicId = builder.publicId;
      this._oauthProvider = builder.oauthProvider;
      this._scope = builder.scope;
      this._accessToken = builder.accessToken;
      this._accessTokenExpiresIn = builder.accessTokenExpiresIn;
      this._refreshToken = builder.refreshToken;
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

   public get accessToken(): string {
      return this._accessToken;
   }

   public get accessTokenExpiresIn(): number {
      return this._accessTokenExpiresIn;
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
   private _publicId!: string;
   private _oauthProvider!: string;
   private _scope!: string;
   private _accessToken!: string;
   private _accessTokenExpiresIn!: number;
   private _refreshToken!: string;

   public withAccountId(accountId: number): CreateAccountTokenDtoBuilder {
      this._accountId = accountId;
      return this;
   }

   public withPublicId(publicId: string): CreateAccountTokenDtoBuilder {
      this._publicId = publicId;
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

   public withAccessTokenExpiresIn(accessTokenExpiresIn: number): CreateAccountTokenDtoBuilder {
      this._accessTokenExpiresIn = accessTokenExpiresIn;
      return this;
   }

   public withRefreshToken(refreshToken: string): CreateAccountTokenDtoBuilder {
      this._refreshToken = refreshToken;
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

   public get accessToken(): string {
      return this._accessToken;
   }

   public get accessTokenExpiresIn(): number {
      return this._accessTokenExpiresIn;
   }

   public get refreshToken(): string {
      return this._refreshToken;
   }

   build(): CreateAccountTokenDto {
      return new CreateAccountTokenDto(this);
   }
}