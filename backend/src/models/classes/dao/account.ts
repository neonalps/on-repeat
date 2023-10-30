import { AccountDaoInterface } from "@src/models/dao/account.dao";

export class AccountDao {
   private _id!: number;
   private _publicId!: string;
   private _displayName!: string;
   private _hashedEmail!: string;
   private _encryptedEmail!: string | null;
   private _enabled!: boolean;
   private _createdAt!: Date;
   private _updatedAt!: Date | null;

   constructor(builder: AccountDaoBuilder) {
      this._id = builder.id;
      this._publicId = builder.publicId;
      this._displayName = builder.displayName;
      this._hashedEmail = builder.hashedEmail;
      this._encryptedEmail = builder.encryptedEmail;
      this._enabled = builder.enabled;
      this._createdAt = builder.createdAt;
      this._updatedAt = builder.updatedAt;
   }

   public get id(): number {
      return this._id;
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

   public get createdAt(): Date {
      return this._createdAt;
   }

   public get updatedAt(): Date | null {
      return this._updatedAt;
   }

   public static get Builder(): AccountDaoBuilder {
      return new AccountDaoBuilder();
   }

   public static fromDaoInterface(item: AccountDaoInterface): AccountDao {
      return this.Builder
         .withId(item.id)
         .withPublicId(item.publicId)
         .withDisplayName(item.displayName)
         .withHashedEmail(item.hashedEmail)
         .withEncryptedEmail(item.encryptedEmail)
         .withEnabled(item.enabled)
         .withCreatedAt(item.createdAt)
         .withUpdatedAt(item.updatedAt)
         .build();
   }
}

class AccountDaoBuilder {
   private _id!: number;
   private _publicId!: string;
   private _displayName!: string;
   private _hashedEmail!: string;
   private _encryptedEmail!: string | null;
   private _enabled!: boolean;
   private _createdAt!: Date;
   private _updatedAt!: Date | null;

   public withId(id: number): AccountDaoBuilder {
      this._id = id;
      return this;
   }

   public withPublicId(publicId: string): AccountDaoBuilder {
      this._publicId = publicId;
      return this;
   }

   public withDisplayName(displayName: string): AccountDaoBuilder {
      this._displayName = displayName;
      return this;
   }

   public withHashedEmail(hashedEmail: string): AccountDaoBuilder {
      this._hashedEmail = hashedEmail;
      return this;
   }

   public withEncryptedEmail(encryptedEmail: string | null): AccountDaoBuilder {
      this._encryptedEmail = encryptedEmail;
      return this;
   }

   public withEnabled(enabled: boolean): AccountDaoBuilder {
      this._enabled = enabled;
      return this;
   }

   public withCreatedAt(createdAt: Date): AccountDaoBuilder {
      this._createdAt = createdAt;
      return this;
   }

   public withUpdatedAt(updatedAt: Date | null): AccountDaoBuilder {
      this._updatedAt = updatedAt;
      return this;
   }

   public get id(): number {
      return this._id;
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

   public get createdAt(): Date {
      return this._createdAt;
   }

   public get updatedAt(): Date | null {
      return this._updatedAt;
   }

   build(): AccountDao {
      return new AccountDao(this);
   }
}