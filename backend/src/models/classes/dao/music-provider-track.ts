import { MusicProviderTrackDaoInterface } from "@src/models/dao/music-provider-track.dao";

export class MusicProviderTrackDao {
    private _id!: number;
    private _musicProviderId!: number;
    private _trackId!: number;
    private _musicProviderTrackId!: string;
    private _musicProviderTrackUri!: string | null;
    private _createdAt!: Date;
 
    constructor(builder: MusicProviderTrackDaoBuilder) {
       this._id = builder.id;
       this._musicProviderId = builder.musicProviderId;
       this._trackId = builder.trackId;
       this._musicProviderTrackId = builder.musicProviderTrackId;
       this._musicProviderTrackUri = builder.musicProviderTrackUri;
       this._createdAt = builder.createdAt;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get musicProviderId(): number {
       return this._musicProviderId;
    }

    public get trackId(): number {
      return this._trackId;
    }
 
    public get musicProviderTrackId(): string {
       return this._musicProviderTrackId;
    }
 
    public get musicProviderTrackUri(): string | null {
       return this._musicProviderTrackUri;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public static get Builder(): MusicProviderTrackDaoBuilder {
       return new MusicProviderTrackDaoBuilder();
    }

    public static fromDaoInterface(item: MusicProviderTrackDaoInterface): MusicProviderTrackDao | null {
        if (!item) {
            return null;
        }

        return this.Builder
            .withId(item.id)
            .withMusicProviderId(item.musicProviderId)
            .withTrackId(item.trackId)
            .withMusicProviderTrackId(item.musicProviderTrackId)
            .withMusicProviderTrackUri(item.musicProviderTrackUri)
            .withCreatedAt(item.createdAt)
            .build();
    }
 }
 
 class MusicProviderTrackDaoBuilder {
    private _id!: number;
    private _musicProviderId!: number;
    private _trackId!: number;
    private _musicProviderTrackId!: string;
    private _musicProviderTrackUri!: string | null;
    private _createdAt!: Date;
 
    public withId(id: number): MusicProviderTrackDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withMusicProviderId(musicProviderId: number): MusicProviderTrackDaoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }

    public withTrackId(trackId: number): MusicProviderTrackDaoBuilder {
      this._trackId = trackId;
      return this;
    }
 
    public withMusicProviderTrackId(musicProviderTrackId: string): MusicProviderTrackDaoBuilder {
       this._musicProviderTrackId = musicProviderTrackId;
       return this;
    }
 
    public withMusicProviderTrackUri(musicProviderTrackUri: string | null): MusicProviderTrackDaoBuilder {
       this._musicProviderTrackUri = musicProviderTrackUri;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): MusicProviderTrackDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get musicProviderId(): number {
       return this._musicProviderId;
    }

    public get trackId(): number {
      return this._trackId;
    }
 
    public get musicProviderTrackId(): string {
       return this._musicProviderTrackId;
    }
 
    public get musicProviderTrackUri(): string | null {
       return this._musicProviderTrackUri;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    build(): MusicProviderTrackDao {
       return new MusicProviderTrackDao(this);
    }
 }