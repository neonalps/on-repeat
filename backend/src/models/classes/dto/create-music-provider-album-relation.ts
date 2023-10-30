export class CreateMusicProviderAlbumRelationDto {
    private _musicProviderId!: number;
    private _albumId!: number;
    private _musicProviderAlbumId!: string;
    private _musicProviderAlbumUri!: string | null;
 
    constructor(builder: CreateMusicProviderAlbumRelationDtoBuilder) {
       this._musicProviderId = builder.musicProviderId;
       this._albumId = builder.albumId;
       this._musicProviderAlbumId = builder.musicProviderAlbumId;
       this._musicProviderAlbumUri = builder.musicProviderAlbumUri;
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
 
    public static get Builder(): CreateMusicProviderAlbumRelationDtoBuilder {
       return new CreateMusicProviderAlbumRelationDtoBuilder();
    }
 }
 
 class CreateMusicProviderAlbumRelationDtoBuilder {
    private _musicProviderId!: number;
    private _albumId!: number;
    private _musicProviderAlbumId!: string;
    private _musicProviderAlbumUri!: string | null;
 
    public withMusicProviderId(musicProviderId: number): CreateMusicProviderAlbumRelationDtoBuilder {
       this._musicProviderId = musicProviderId;
       return this;
    }
 
    public withAlbumId(albumId: number): CreateMusicProviderAlbumRelationDtoBuilder {
       this._albumId = albumId;
       return this;
    }
 
    public withMusicProviderAlbumId(musicProviderAlbumId: string): CreateMusicProviderAlbumRelationDtoBuilder {
       this._musicProviderAlbumId = musicProviderAlbumId;
       return this;
    }
 
    public withMusicProviderAlbumUri(musicProviderAlbumUri: string | null): CreateMusicProviderAlbumRelationDtoBuilder {
       this._musicProviderAlbumUri = musicProviderAlbumUri;
       return this;
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
 
    build(): CreateMusicProviderAlbumRelationDto {
       return new CreateMusicProviderAlbumRelationDto(this);
    }
 }