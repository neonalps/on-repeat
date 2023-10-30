export class AuthTokenDto {
    private _accessToken!: string;
 
    constructor(builder: AuthTokenDtoBuilder) {
       this._accessToken = builder.accessToken;
    }
 
    public get accessToken(): string {
       return this._accessToken;
    }
 
    public static get Builder(): AuthTokenDtoBuilder {
       return new AuthTokenDtoBuilder();
    }
 }
 
 class AuthTokenDtoBuilder {
    private _accessToken!: string;
 
    public withAccessToken(accessToken: string): AuthTokenDtoBuilder {
       this._accessToken = accessToken;
       return this;
    }
 
    public get accessToken(): string {
       return this._accessToken;
    }
 
    build(): AuthTokenDto {
       return new AuthTokenDto(this);
    }
 }