import { AlbumDao } from "@src/models/classes/dao/album";

export class UpdateAlbumDto {
    private _name!: string;
    private _albumType!: string | null;
    private _albumGroup!: string | null;
    private _totalTracks!: number | null;
    private _releaseDate!: Date | null;
    private _releaseDatePrecision!: string | null;
 
    constructor(builder: UpdateAlbumDtoBuilder) {
       this._name = builder.name;
       this._albumType = builder.albumType;
       this._albumGroup = builder.albumGroup;
       this._totalTracks = builder.totalTracks;
       this._releaseDate = builder.releaseDate;
       this._releaseDatePrecision = builder.releaseDatePrecision;
    }
 
    public get name(): string {
       return this._name;
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
 
    public static get Builder(): UpdateAlbumDtoBuilder {
       return new UpdateAlbumDtoBuilder();
    }

    public static createFromAlbumDao(dao: AlbumDao): UpdateAlbumDto | null {
        if (!dao) {
            return null;
        }

        return this.Builder
            .withName(dao.name)
            .withAlbumGroup(dao.albumGroup)
            .withAlbumType(dao.albumType)
            .withTotalTracks(dao.totalTracks)
            .withReleaseDate(dao.releaseDate)
            .withReleaseDatePrecision(dao.releaseDatePrecision)
            .build();
    }
 }
 
 class UpdateAlbumDtoBuilder {
    private _name!: string;
    private _albumType!: string | null;
    private _albumGroup!: string | null;
    private _totalTracks!: number | null;
    private _releaseDate!: Date | null;
    private _releaseDatePrecision!: string | null;
 
    public withName(name: string): UpdateAlbumDtoBuilder {
       this._name = name;
       return this;
    }
 
    public withAlbumType(albumType: string | null): UpdateAlbumDtoBuilder {
       this._albumType = albumType;
       return this;
    }
 
    public withAlbumGroup(albumGroup: string | null): UpdateAlbumDtoBuilder {
       this._albumGroup = albumGroup;
       return this;
    }

    public withTotalTracks(totalTracks: number | null): UpdateAlbumDtoBuilder {
      this._totalTracks = totalTracks;
      return this;
    }
 
    public withReleaseDate(releaseDate: Date | null): UpdateAlbumDtoBuilder {
       this._releaseDate = releaseDate;
       return this;
    }
 
    public withReleaseDatePrecision(releaseDatePrecision: string | null): UpdateAlbumDtoBuilder {
       this._releaseDatePrecision = releaseDatePrecision;
       return this;
    }
 
    public get name(): string {
       return this._name;
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
 
    build(): UpdateAlbumDto {
       return new UpdateAlbumDto(this);
    }
 }