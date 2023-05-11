import { MusicProviderArtistDaoInterface } from "@src/models/dao/music-provider-artist.dao";

export class MusicProviderArtistDao {
   private _id!: number;
   private _musicProviderId!: number;
   private _artistId!: number;
   private _musicProviderArtistId!: string;
   private _musicProviderArtistUri!: string | null;
   private _createdAt!: Date;

   constructor(builder: MusicProviderArtistDaoBuilder) {
      this._id = builder.id;
      this._musicProviderId = builder.musicProviderId;
      this._artistId = builder.artistId;
      this._musicProviderArtistId = builder.musicProviderArtistId;
      this._musicProviderArtistUri = builder.musicProviderArtistUri;
      this._createdAt = builder.createdAt;
   }

   public get id(): number {
      return this._id;
   }

   public get musicProviderId(): number {
      return this._musicProviderId;
   }

   public get artistId(): number {
      return this._artistId;
   }

   public get musicProviderArtistId(): string {
      return this._musicProviderArtistId;
   }

   public get musicProviderArtistUri(): string | null {
      return this._musicProviderArtistUri;
   }

   public get createdAt(): Date {
      return this._createdAt;
   }

   public static get Builder(): MusicProviderArtistDaoBuilder {
      return new MusicProviderArtistDaoBuilder();
   }

   public static fromDaoInterface(item: MusicProviderArtistDaoInterface): MusicProviderArtistDao | null {
      if (!item) {
         return null;
      }

      return this.Builder
         .withId(item.id)
         .withMusicProviderId(item.musicProviderId)
         .withArtistId(item.artistId)
         .withMusicProviderArtistId(item.musicProviderArtistId)
         .withMusicProviderArtistUri(item.musicProviderArtistUri)
         .withCreatedAt(item.createdAt)
         .build();
   }
}

class MusicProviderArtistDaoBuilder {
   private _id!: number;
   private _musicProviderId!: number;
   private _artistId!: number;
   private _musicProviderArtistId!: string;
   private _musicProviderArtistUri!: string | null;
   private _createdAt!: Date;

   public withId(id: number): MusicProviderArtistDaoBuilder {
      this._id = id;
      return this;
   }

   public withMusicProviderId(musicProviderId: number): MusicProviderArtistDaoBuilder {
      this._musicProviderId = musicProviderId;
      return this;
   }

   public withArtistId(artistId: number): MusicProviderArtistDaoBuilder {
      this._artistId = artistId;
      return this;
   }

   public withMusicProviderArtistId(musicProviderArtistId: string): MusicProviderArtistDaoBuilder {
      this._musicProviderArtistId = musicProviderArtistId;
      return this;
   }

   public withMusicProviderArtistUri(musicProviderArtistUri: string | null): MusicProviderArtistDaoBuilder {
      this._musicProviderArtistUri = musicProviderArtistUri;
      return this;
   }

   public withCreatedAt(createdAt: Date): MusicProviderArtistDaoBuilder {
      this._createdAt = createdAt;
      return this;
   }

   public get id(): number {
      return this._id;
   }

   public get musicProviderId(): number {
      return this._musicProviderId;
   }

   public get artistId(): number {
      return this._artistId;
   }

   public get musicProviderArtistId(): string {
      return this._musicProviderArtistId;
   }

   public get musicProviderArtistUri(): string | null {
      return this._musicProviderArtistUri;
   }

   public get createdAt(): Date {
      return this._createdAt;
   }

   build(): MusicProviderArtistDao {
      return new MusicProviderArtistDao(this);
   }
}