export class PlayedTrackDto {
    private _id!: number;
    private _accountId!: number;
    private _trackId!: number;
    private _musicProviderId!: number;
    private _playedAt!: Date;
    private _createdAt!: Date;
 
    constructor(builder: PlayedTrackDtoBuilder) {
       this._id = builder.id;
       this._accountId = builder.accountId;
       this._trackId = builder.trackId;
       this._musicProviderId = builder.musicProviderId;
       this._playedAt = builder.playedAt;
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
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public static get Builder(): PlayedTrackDtoBuilder {
       return new PlayedTrackDtoBuilder();
    }
 }
 
 class PlayedTrackDtoBuilder {
    private _id!: number;
    private _accountId!: number;
    private _trackId!: number;
    private _musicProviderId!: number;
    private _playedAt!: Date;
    private _createdAt!: Date;
 
    public withId(id: number): PlayedTrackDtoBuilder {
       this._id = id;
       return this;
    }
 
    public withAccountId(accountId: number): PlayedTrackDtoBuilder {
       this._accountId = accountId;
       return this;
    }
 
    public withTrackId(trackId: number): PlayedTrackDtoBuilder {
       this._trackId = trackId;
       return this;
    }
 
    public withMusicProviderId(musicProviderId: number): PlayedTrackDtoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }
 
    public withPlayedAt(playedAt: Date): PlayedTrackDtoBuilder {
       this._playedAt = playedAt;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): PlayedTrackDtoBuilder {
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
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    build(): PlayedTrackDto {
       return new PlayedTrackDto(this);
    }
 }