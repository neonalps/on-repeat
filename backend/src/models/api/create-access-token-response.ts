export class CreateAccessTokenResponseDto {
    private _accessToken!: string;
 
    constructor(builder: CreateAccessTokenResponseDtoBuilder) {
       this._accessToken = builder.accessToken;
    }
 
    public get accessToken(): string {
       return this._accessToken;
    }
 
    public static get Builder(): CreateAccessTokenResponseDtoBuilder {
       return new CreateAccessTokenResponseDtoBuilder();
    }

    public toString(): string {
      return JSON.stringify({
         accessToken: this._accessToken,
      });
    }
 }
 
 class CreateAccessTokenResponseDtoBuilder {
    private _accessToken!: string;
 
    public withAccessToken(accessToken: string): CreateAccessTokenResponseDtoBuilder {
       this._accessToken = accessToken;
       return this;
    }
 
    public get accessToken(): string {
       return this._accessToken;
    }
 
    build(): CreateAccessTokenResponseDto {
       return new CreateAccessTokenResponseDto(this);
    }
 }
 