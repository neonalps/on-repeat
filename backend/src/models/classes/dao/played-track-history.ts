import { PlayedTrackHistoryDaoInterface } from "@src/models/dao/played-track-history.dao";

export class PlayedTrackHistoryDao {
    private _id!: number;
    private _playedAt!: Date;
    private _musicProviderId!: number;
    private _musicProviderName!: string;
    private _includeInStatistics!: boolean;
 
    constructor(builder: PlayedTrackHistoryDaoBuilder) {
       this._id = builder.id;
       this._playedAt = builder.playedAt;
       this._musicProviderId = builder.musicProviderId;
       this._musicProviderName = builder.musicProviderName;
       this._includeInStatistics = builder.includeInStatistics;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get playedAt(): Date {
       return this._playedAt;
    }
 
    public get musicProviderId(): number {
       return this._musicProviderId;
    }
 
    public get musicProviderName(): string {
       return this._musicProviderName;
    }
 
    public get includeInStatistics(): boolean {
       return this._includeInStatistics;
    }
 
    public static get Builder(): PlayedTrackHistoryDaoBuilder {
       return new PlayedTrackHistoryDaoBuilder();
    }

    public static fromDaoInterface(item: PlayedTrackHistoryDaoInterface): PlayedTrackHistoryDao | null {
        if (!item) {
            return null;
        }

        return this.Builder
            .withId(item.playedTrackId)
            .withPlayedAt(item.playedAt)
            .withIncludeInStatistics(item.includeInStatistics)
            .withMusicProviderId(item.musicProviderId)
            .withMusicProviderName(item.musicProviderName)
            .build();
    }
 }
 
 class PlayedTrackHistoryDaoBuilder {
    private _id!: number;
    private _playedAt!: Date;
    private _musicProviderId!: number;
    private _musicProviderName!: string;
    private _includeInStatistics!: boolean;
 
    public withId(id: number): PlayedTrackHistoryDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withPlayedAt(playedAt: Date): PlayedTrackHistoryDaoBuilder {
       this._playedAt = playedAt;
       return this;
    }
 
    public withMusicProviderId(musicProviderId: number): PlayedTrackHistoryDaoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }
 
    public withMusicProviderName(musicProviderName: string): PlayedTrackHistoryDaoBuilder {
       this._musicProviderName = musicProviderName;
       return this;
    }
 
    public withIncludeInStatistics(includeInStatistics: boolean): PlayedTrackHistoryDaoBuilder {
       this._includeInStatistics = includeInStatistics;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get playedAt(): Date {
       return this._playedAt;
    }
 
    public get musicProviderId(): number {
       return this._musicProviderId;
    }
 
    public get musicProviderName(): string {
       return this._musicProviderName;
    }
 
    public get includeInStatistics(): boolean {
       return this._includeInStatistics;
    }
 
    build(): PlayedTrackHistoryDao {
       return new PlayedTrackHistoryDao(this);
    }
 }