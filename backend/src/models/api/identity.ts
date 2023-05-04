export class IdentityDto {
    private _publicId!: string;
    private _email!: string;
    private _displayName!: string | null;
 
    constructor(builder: IdentityDtoBuilder) {
       this._publicId = builder.publicId;
       this._email = builder.email;
       this._displayName = builder.displayName;
    }
 
    public get publicId(): string {
       return this._publicId;
    }
 
    public get email(): string {
       return this._email;
    }
 
    public get displayName(): string | null {
       return this._displayName;
    }
 
    public static get Builder(): IdentityDtoBuilder {
       return new IdentityDtoBuilder();
    }
 }
 
 class IdentityDtoBuilder {
    private _publicId!: string;
    private _email!: string;
    private _displayName!: string | null;
 
    public withPublicId(publicId: string): IdentityDtoBuilder {
       this._publicId = publicId;
       return this;
    }
 
    public withEmail(email: string): IdentityDtoBuilder {
       this._email = email;
       return this;
    }
 
    public withDisplayName(displayName: string | null): IdentityDtoBuilder {
       this._displayName = displayName;
       return this;
    }
 
    public get publicId(): string {
       return this._publicId;
    }
 
    public get email(): string {
       return this._email;
    }
 
    public get displayName(): string | null {
       return this._displayName;
    }
 
    build(): IdentityDto {
       return new IdentityDto(this);
    }
 }