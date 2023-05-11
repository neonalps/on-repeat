export class CreateMusicProviderTrackRelationDto {
    private _musicProviderId!: number;
    private _trackId!: number;
    private _musicProviderTrackId!: string;
    private _musicProviderTrackUri!: string | null;
 
    constructor(builder: CreateMusicProviderTrackRelationDtoBuilder) {
       this._musicProviderId = builder.musicProviderId;
       this._trackId = builder.trackId;
       this._musicProviderTrackId = builder.musicProviderTrackId;
       this._musicProviderTrackUri = builder.musicProviderTrackUri;
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
 
    public static get Builder(): CreateMusicProviderTrackRelationDtoBuilder {
       return new CreateMusicProviderTrackRelationDtoBuilder();
    }
 }
 
 class CreateMusicProviderTrackRelationDtoBuilder {
    private _musicProviderId!: number;
    private _trackId!: number;
    private _musicProviderTrackId!: string;
    private _musicProviderTrackUri!: string | null;
 
    public withMusicProviderId(musicProviderId: number): CreateMusicProviderTrackRelationDtoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }
 
    public withTrackId(trackId: number): CreateMusicProviderTrackRelationDtoBuilder {
       this._trackId = trackId;
       return this;
    }
 
    public withMusicProviderTrackId(musicProviderTrackId: string): CreateMusicProviderTrackRelationDtoBuilder {
       this._musicProviderTrackId = musicProviderTrackId;
       return this;
    }
 
    public withMusicProviderTrackUri(musicProviderTrackUri: string | null): CreateMusicProviderTrackRelationDtoBuilder {
       this._musicProviderTrackUri = musicProviderTrackUri;
       return this;
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
 
    build(): CreateMusicProviderTrackRelationDto {
       return new CreateMusicProviderTrackRelationDto(this);
    }
 }
 