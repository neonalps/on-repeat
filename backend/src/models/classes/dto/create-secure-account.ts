export class CreateSecureAccountDto {
   private _publicId!: string;
   private _displayName!: string;
   private _hashedEmail!: string;
   private _encryptedEmail!: string | null;
   private _enabled!: boolean;

   constructor(builder: CreateSecureAccountDtoBuilder) {
      this._publicId = builder.publicId;
      this._displayName = builder.displayName;
      this._hashedEmail = builder.hashedEmail;
      this._encryptedEmail = builder.encryptedEmail;
      this._enabled = builder.enabled;
   }

   public get publicId(): string {
      return this._publicId;
   }

   public get displayName(): string {
      return this._displayName;
   }

   public get hashedEmail(): string {
      return this._hashedEmail;
   }

   public get encryptedEmail(): string | null {
      return this._encryptedEmail;
   }

   public get enabled(): boolean {
      return this._enabled;
   }

   public static get Builder(): CreateSecureAccountDtoBuilder {
      return new CreateSecureAccountDtoBuilder();
   }
}

class CreateSecureAccountDtoBuilder {
   private _publicId!: string;
   private _displayName!: string;
   private _hashedEmail!: string;
   private _encryptedEmail!: string | null;
   private _enabled!: boolean;

   public withPublicId(publicId: string): CreateSecureAccountDtoBuilder {
      this._publicId = publicId;
      return this;
   }

   public withDisplayName(displayName: string): CreateSecureAccountDtoBuilder {
      this._displayName = displayName;
      return this;
   }

   public withHashedEmail(hashedEmail: string): CreateSecureAccountDtoBuilder {
      this._hashedEmail = hashedEmail;
      return this;
   }

   public withEncryptedEmail(encryptedEmail: string | null): CreateSecureAccountDtoBuilder {
      this._encryptedEmail = encryptedEmail;
      return this;
   }

   public withEnabled(enabled: boolean): CreateSecureAccountDtoBuilder {
      this._enabled = enabled;
      return this;
   }

   public get publicId(): string {
      return this._publicId;
   }

   public get displayName(): string {
      return this._displayName;
   }

   public get hashedEmail(): string {
      return this._hashedEmail;
   }

   public get encryptedEmail(): string | null {
      return this._encryptedEmail;
   }

   public get enabled(): boolean {
      return this._enabled;
   }

   build(): CreateSecureAccountDto {
      return new CreateSecureAccountDto(this);
   }
}