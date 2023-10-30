export class CreatePlayedTrackDto {
    private _accountId!: number;
    private _trackId!: number;
    private _musicProviderId!: number;
    private _playedAt!: Date;
    private _includeInStatistics!: boolean;
 
    constructor(builder: CreatePlayedTrackDtoBuilder) {
       this._accountId = builder.accountId;
       this._trackId = builder.trackId;
       this._musicProviderId = builder.musicProviderId;
       this._playedAt = builder.playedAt;
       this._includeInStatistics = builder.includeInStatistics;
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
 
    public static get Builder(): CreatePlayedTrackDtoBuilder {
       return new CreatePlayedTrackDtoBuilder();
    }
 }
 
 class CreatePlayedTrackDtoBuilder {
    private _accountId!: number;
    private _trackId!: number;
    private _musicProviderId!: number;
    private _playedAt!: Date;
    private _includeInStatistics!: boolean;
 
    public withAccountId(accountId: number): CreatePlayedTrackDtoBuilder {
       this._accountId = accountId;
       return this;
    }
 
    public withTrackId(trackId: number): CreatePlayedTrackDtoBuilder {
       this._trackId = trackId;
       return this;
    }
 
    public withMusicProviderId(musicProviderId: number): CreatePlayedTrackDtoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }
 
    public withPlayedAt(playedAt: Date): CreatePlayedTrackDtoBuilder {
       this._playedAt = playedAt;
       return this;
    }
 
    public withIncludeInStatistics(includeInStatistics: boolean): CreatePlayedTrackDtoBuilder {
       this._includeInStatistics = includeInStatistics;
       return this;
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
 
    build(): CreatePlayedTrackDto {
       return new CreatePlayedTrackDto(this);
    }
 }