import { PlayedTrackDaoInterface } from "@src/models/dao/played-track.dao";

export class PlayedTrackDao {
    private _id!: number;
    private _accountId!: number;
    private _trackId!: number;
    private _musicProviderId!: number;
    private _playedAt!: Date;
    private _includeInStatistics!: boolean;
    private _createdAt!: Date;
 
    constructor(builder: PlayedTrackDaoBuilder) {
       this._id = builder.id;
       this._accountId = builder.accountId;
       this._trackId = builder.trackId;
       this._musicProviderId = builder.musicProviderId;
       this._playedAt = builder.playedAt;
       this._includeInStatistics = builder.includeInStatistics;
       this._createdAt = builder.createdAt;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get accountId(): number {
       return this._accountId;
    }
 
    public get trackId(): number {
       return this._trackId;
    }
 
    public get musicProviderId(): number {
       return this._musicProviderId;
    }
 
    public get playedAt(): Date {
       return this._playedAt;
    }
 
    public get includeInStatistics(): boolean {
       return this._includeInStatistics;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public static get Builder(): PlayedTrackDaoBuilder {
       return new PlayedTrackDaoBuilder();
    }

    public static fromDaoInterface(item: PlayedTrackDaoInterface): PlayedTrackDao | null {
        if (!item) {
            return null;
        }

        return this.Builder
            .withId(item.id)
            .withAccountId(item.accountId)
            .withTrackId(item.trackId)
            .withMusicProviderId(item.musicProviderId)
            .withPlayedAt(item.playedAt)
            .withIncludeInStatistics(item.includeInStatistics)
            .withCreatedAt(item.createdAt)
            .build();
    }
 }
 
 class PlayedTrackDaoBuilder {
    private _id!: number;
    private _accountId!: number;
    private _trackId!: number;
    private _musicProviderId!: number;
    private _playedAt!: Date;
    private _includeInStatistics!: boolean;
    private _createdAt!: Date;
 
    public withId(id: number): PlayedTrackDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withAccountId(accountId: number): PlayedTrackDaoBuilder {
       this._accountId = accountId;
       return this;
    }
 
    public withTrackId(trackId: number): PlayedTrackDaoBuilder {
       this._trackId = trackId;
       return this;
    }
 
    public withMusicProviderId(musicProviderId: number): PlayedTrackDaoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }
 
    public withPlayedAt(playedAt: Date): PlayedTrackDaoBuilder {
       this._playedAt = playedAt;
       return this;
    }
 
    public withIncludeInStatistics(includeInStatistics: boolean): PlayedTrackDaoBuilder {
       this._includeInStatistics = includeInStatistics;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): PlayedTrackDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get accountId(): number {
       return this._accountId;
    }
 
    public get trackId(): number {
       return this._trackId;
    }
 
    public get musicProviderId(): number {
       return this._musicProviderId;
    }
 
    public get playedAt(): Date {
       return this._playedAt;
    }
 
    public get includeInStatistics(): boolean {
       return this._includeInStatistics;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    build(): PlayedTrackDao {
       return new PlayedTrackDao(this);
    }
 }