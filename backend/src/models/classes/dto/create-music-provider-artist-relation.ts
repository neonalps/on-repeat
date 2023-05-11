export class CreateMusicProviderArtistRelationDto {
    private _musicProviderId!: number;
    private _artistId!: number;
    private _musicProviderArtistId!: string;
    private _musicProviderArtistUri!: string | null;
 
    constructor(builder: CreateMusicProviderArtistRelationDtoBuilder) {
       this._musicProviderId = builder.musicProviderId;
       this._artistId = builder.artistId;
       this._musicProviderArtistId = builder.musicProviderArtistId;
       this._musicProviderArtistUri = builder.musicProviderArtistUri;
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
 
    public static get Builder(): CreateMusicProviderArtistRelationDtoBuilder {
       return new CreateMusicProviderArtistRelationDtoBuilder();
    }
 }
 
 class CreateMusicProviderArtistRelationDtoBuilder {
    private _musicProviderId!: number;
    private _artistId!: number;
    private _musicProviderArtistId!: string;
    private _musicProviderArtistUri!: string | null;
 
    public withMusicProviderId(musicProviderId: number): CreateMusicProviderArtistRelationDtoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }
 
    public withArtistId(artistId: number): CreateMusicProviderArtistRelationDtoBuilder {
       this._artistId = artistId;
       return this;
    }
 
    public withMusicProviderArtistId(musicProviderArtistId: string): CreateMusicProviderArtistRelationDtoBuilder {
       this._musicProviderArtistId = musicProviderArtistId;
       return this;
    }
 
    public withMusicProviderArtistUri(musicProviderArtistUri: string | null): CreateMusicProviderArtistRelationDtoBuilder {
       this._musicProviderArtistUri = musicProviderArtistUri;
       return this;
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
 
    build(): CreateMusicProviderArtistRelationDto {
       return new CreateMusicProviderArtistRelationDto(this);
    }
 }
 