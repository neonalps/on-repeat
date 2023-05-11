import { CreateAlbumImageDto } from "@src/models/classes/dto/create-album-image";

export class CreateAlbumDto {
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumType!: string | null;
    private _albumGroup!: string | null;
    private _totalTracks!: number | null;
    private _releaseDate!: Date | null;
    private _releaseDatePrecision!: string | null;
    private _images!: Set<CreateAlbumImageDto>;
 
    constructor(builder: CreateAlbumDtoBuilder) {
       this._name = builder.name;
       this._artistIds = new Set(builder.artistIds);
       this._albumType = builder.albumType;
       this._albumGroup = builder.albumGroup;
       this._totalTracks = builder.totalTracks;
       this._releaseDate = builder.releaseDate;
       this._releaseDatePrecision = builder.releaseDatePrecision;
       this._images = new Set(builder.images);
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get artistIds(): Set<number> {
       return new Set(this._artistIds);
    }
 
    public get albumType(): string | null {
       return this._albumType;
    }
 
    public get albumGroup(): string | null {
       return this._albumGroup;
    }

    public get totalTracks(): number | null {
      return this._totalTracks;
    }
 
    public get releaseDate(): Date | null {
       return this._releaseDate;
    }
 
    public get releaseDatePrecision(): string | null {
       return this._releaseDatePrecision;
    }
 
    public get images(): Set<CreateAlbumImageDto> {
       return new Set(this._images);
    }
 
    public static get Builder(): CreateAlbumDtoBuilder {
       return new CreateAlbumDtoBuilder();
    }
 }
 
 class CreateAlbumDtoBuilder {
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumType!: string | null;
    private _albumGroup!: string | null;
    private _totalTracks!: number | null;
    private _releaseDate!: Date | null;
    private _releaseDatePrecision!: string | null;
    private _images!: Set<CreateAlbumImageDto>;
 
    public withName(name: string): CreateAlbumDtoBuilder {
       this._name = name;
       return this;
    }
 
    public withArtistIds(artistIds: Set<number>): CreateAlbumDtoBuilder {
       this._artistIds = new Set(artistIds);
       return this;
    }
 
    public withAlbumType(albumType: string | null): CreateAlbumDtoBuilder {
       this._albumType = albumType;
       return this;
    }
 
    public withAlbumGroup(albumGroup: string | null): CreateAlbumDtoBuilder {
       this._albumGroup = albumGroup;
       return this;
    }

    public withTotalTracks(totalTracks: number | null): CreateAlbumDtoBuilder {
      this._totalTracks = totalTracks;
      return this;
    }
 
    public withReleaseDate(releaseDate: Date | null): CreateAlbumDtoBuilder {
       this._releaseDate = releaseDate;
       return this;
    }
 
    public withReleaseDatePrecision(releaseDatePrecision: string | null): CreateAlbumDtoBuilder {
       this._releaseDatePrecision = releaseDatePrecision;
       return this;
    }
 
    public withImages(images: Set<CreateAlbumImageDto>): CreateAlbumDtoBuilder {
       this._images = new Set(images);
       return this;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get artistIds(): Set<number> {
       return new Set(this._artistIds);
    }
 
    public get albumType(): string | null {
       return this._albumType;
    }
 
    public get albumGroup(): string | null {
       return this._albumGroup;
    }
 
    public get releaseDate(): Date | null {
       return this._releaseDate;
    }

    public get totalTracks(): number | null {
      return this._totalTracks;
    }
 
    public get releaseDatePrecision(): string | null {
       return this._releaseDatePrecision;
    }
 
    public get images(): Set<CreateAlbumImageDto> {
       return new Set(this._images);
    }
 
    build(): CreateAlbumDto {
       return new CreateAlbumDto(this);
    }
 }
 