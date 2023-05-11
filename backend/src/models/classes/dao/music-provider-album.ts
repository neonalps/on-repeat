import { MusicProviderAlbumDaoInterface } from "@src/models/dao/music-provider-album.dao";

export class MusicProviderAlbumDao {
   private _id!: number;
   private _musicProviderId!: number;
   private _albumId!: number;
   private _musicProviderAlbumId!: string;
   private _musicProviderAlbumUri!: string | null;
   private _createdAt!: Date;

   constructor(builder: MusicProviderAlbumDaoBuilder) {
      this._id = builder.id;
      this._musicProviderId = builder.musicProviderId;
      this._albumId = builder.albumId;
      this._musicProviderAlbumId = builder.musicProviderAlbumId;
      this._musicProviderAlbumUri = builder.musicProviderAlbumUri;
      this._createdAt = builder.createdAt;
   }

   public get id(): number {
      return this._id;
   }

   public get musicProviderId(): number {
      return this._musicProviderId;
   }

   public get albumId(): number {
      return this._albumId;
   }

   public get musicProviderAlbumId(): string {
      return this._musicProviderAlbumId;
   }

   public get musicProviderAlbumUri(): string | null {
      return this._musicProviderAlbumUri;
   }

   public get createdAt(): Date {
      return this._createdAt;
   }

   public static get Builder(): MusicProviderAlbumDaoBuilder {
      return new MusicProviderAlbumDaoBuilder();
   }

   public static fromDaoInterface(item: MusicProviderAlbumDaoInterface): MusicProviderAlbumDao | null {
      if (!item) {
         return null;
      }

      return this.Builder
         .withId(item.id)
         .withMusicProviderId(item.musicProviderId)
         .withAlbumId(item.albumId)
         .withMusicProviderAlbumId(item.musicProviderAlbumId)
         .withMusicProviderAlbumUri(item.musicProviderAlbumUri)
         .withCreatedAt(item.createdAt)
         .build();
   }
}

class MusicProviderAlbumDaoBuilder {
   private _id!: number;
   private _musicProviderId!: number;
   private _albumId!: number;
   private _musicProviderAlbumId!: string;
   private _musicProviderAlbumUri!: string | null;
   private _createdAt!: Date;

   public withId(id: number): MusicProviderAlbumDaoBuilder {
      this._id = id;
      return this;
   }

   public withMusicProviderId(musicProviderId: number): MusicProviderAlbumDaoBuilder {
      this._musicProviderId = musicProviderId;
      return this;
   }

   public withAlbumId(albumId: number): MusicProviderAlbumDaoBuilder {
      this._albumId = albumId;
      return this;
   }

   public withMusicProviderAlbumId(musicProviderAlbumId: string): MusicProviderAlbumDaoBuilder {
      this._musicProviderAlbumId = musicProviderAlbumId;
      return this;
   }

   public withMusicProviderAlbumUri(musicProviderAlbumUri: string | null): MusicProviderAlbumDaoBuilder {
      this._musicProviderAlbumUri = musicProviderAlbumUri;
      return this;
   }

   public withCreatedAt(createdAt: Date): MusicProviderAlbumDaoBuilder {
      this._createdAt = createdAt;
      return this;
   }

   public get id(): number {
      return this._id;
   }

   public get musicProviderId(): number {
      return this._musicProviderId;
   }

   public get albumId(): number {
      return this._albumId;
   }

   public get musicProviderAlbumId(): string {
      return this._musicProviderAlbumId;
   }

   public get musicProviderAlbumUri(): string | null {
      return this._musicProviderAlbumUri;
   }

   public get createdAt(): Date {
      return this._createdAt;
   }

   build(): MusicProviderAlbumDao {
      return new MusicProviderAlbumDao(this);
   }
}