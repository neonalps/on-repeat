export class CreateAccountDto {
    private _publicId!: string;
    private _email!: string;
    private _displayName!: string;
    private _enabled!: boolean;
 
    constructor(builder: CreateAccountDtoBuilder) {
       this._publicId = builder.publicId;
       this._email = builder.email;
       this._displayName = builder.displayName;
       this._enabled = builder.enabled;
    }
 
    public get publicId(): string {
       return this._publicId;
    }
 
    public get email(): string {
       return this._email;
    }

    public get displayName(): string {
      return this._displayName;
    }
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    public static get Builder(): CreateAccountDtoBuilder {
       return new CreateAccountDtoBuilder();
    }
 }
 
 class CreateAccountDtoBuilder {
    private _publicId!: string;
    private _email!: string;
    private _displayName!: string;
    private _enabled!: boolean;
 
    public withPublicId(publicId: string): CreateAccountDtoBuilder {
       this._publicId = publicId;
       return this;
    }
 
    public withEmail(email: string): CreateAccountDtoBuilder {
       this._email = email;
       return this;
    }

    public withDisplayName(displayName: string): CreateAccountDtoBuilder {
      this._displayName = displayName;
      return this;
    }
 
    public withEnabled(enabled: boolean): CreateAccountDtoBuilder {
       this._enabled = enabled;
       return this;
    }
 
    public get publicId(): string {
       return this._publicId;
    }
 
    public get email(): string {
       return this._email;
    }

    public get displayName(): string {
      return this._displayName;
    }
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    build(): CreateAccountDto {
       return new CreateAccountDto(this);
    }
 }