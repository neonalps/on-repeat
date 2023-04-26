import { Jwt } from "@src/models/interface/jwt";

export class AuthToken {
    private _tokenType!: string;
    private _issuer!: string;
    private _audience!: string;
    private _subject!: string;
    private _scopes!: Set<string>;
    private _issuedAt!: number;
    private _expiresAt!: number;
    private _notBefore!: number;
 
    constructor(builder: AuthTokenBuilder) {
       this._tokenType = builder.tokenType;
       this._issuer = builder.issuer;
       this._audience = builder.audience;
       this._subject = builder.subject;
       this._scopes = new Set(builder.scopes);
       this._issuedAt = builder.issuedAt;
       this._expiresAt = builder.expiresAt;
       this._notBefore = builder.notBefore;
    }
 
    public get tokenType(): string {
       return this._tokenType;
    }
 
    public get issuer(): string {
       return this._issuer;
    }
 
    public get audience(): string {
       return this._audience;
    }
 
    public get subject(): string {
       return this._subject;
    }
 
    public get scopes(): Set<string> {
       return new Set(this._scopes);
    }
 
    public get issuedAt(): number {
       return this._issuedAt;
    }
 
    public get expiresAt(): number {
       return this._expiresAt;
    }
 
    public get notBefore(): number {
       return this._notBefore;
    }
 
    public static get Builder(): AuthTokenBuilder {
       return new AuthTokenBuilder();
    }
    
    public convertToJwt(): Jwt {
        return {
            iss: this.issuer,
            aud: this.audience,
            sub: this.subject,
            scp: Array.from(this.scopes),
            iat: this.issuedAt,
            exp: this.expiresAt,
            nbf: this.notBefore,
        }
    }
 }
 
 class AuthTokenBuilder {
    private _tokenType!: string;
    private _issuer!: string;
    private _audience!: string;
    private _subject!: string;
    private _scopes!: Set<string>;
    private _issuedAt!: number;
    private _expiresAt!: number;
    private _notBefore!: number;
 
    public withTokenType(tokenType: string): AuthTokenBuilder {
       this._tokenType = tokenType;
       return this;
    }
 
    public withIssuer(issuer: string): AuthTokenBuilder {
       this._issuer = issuer;
       return this;
    }
 
    public withAudience(audience: string): AuthTokenBuilder {
       this._audience = audience;
       return this;
    }
 
    public withSubject(subject: string): AuthTokenBuilder {
       this._subject = subject;
       return this;
    }
 
    public withScopes(scopes: Set<string>): AuthTokenBuilder {
       this._scopes = new Set(scopes);
       return this;
    }
 
    public withIssuedAt(issuedAt: number): AuthTokenBuilder {
       this._issuedAt = issuedAt;
       return this;
    }
 
    public withExpiresAt(expiresAt: number): AuthTokenBuilder {
       this._expiresAt = expiresAt;
       return this;
    }
 
    public withNotBefore(notBefore: number): AuthTokenBuilder {
       this._notBefore = notBefore;
       return this;
    }
 
    public get tokenType(): string {
       return this._tokenType;
    }
 
    public get issuer(): string {
       return this._issuer;
    }
 
    public get audience(): string {
       return this._audience;
    }
 
    public get subject(): string {
       return this._subject;
    }
 
    public get scopes(): Set<string> {
       return new Set(this._scopes);
    }
 
    public get issuedAt(): number {
       return this._issuedAt;
    }
 
    public get expiresAt(): number {
       return this._expiresAt;
    }
 
    public get notBefore(): number {
       return this._notBefore;
    }
 
    build(): AuthToken {
       return new AuthToken(this);
    }
 }