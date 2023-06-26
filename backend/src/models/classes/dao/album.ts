import { ImageDao } from "@src/models/classes/dao/image";

export class AlbumDao {
    private _id!: number;
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumType!: string | null;
    private _albumGroup!: string | null;
    private _totalTracks!: number | null;
    private _releaseDate!: Date | null;
    private _releaseDatePrecision!: string | null;
    private _images!: Set<ImageDao>;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    constructor(builder: AlbumDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
       this._artistIds = new Set(builder.artistIds);
       this._albumType = builder.albumType;
       this._albumGroup = builder.albumGroup;
       this._totalTracks = builder.totalTracks;
       this._releaseDate = builder.releaseDate;
       this._releaseDatePrecision = builder.releaseDatePrecision;
       this._images = new Set(builder.images);
       this._createdAt = builder.createdAt;
       this._updatedAt = builder.updatedAt;
    }
 
    public get id(): number {
       return this._id;
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
 
    public get images(): Set<ImageDao> {
       return new Set(this._images);
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }

    public areUpdateablePropertiesEqual(other: AlbumDao): boolean {
      if (!other) {
         return false;
      }

      if (this === other) {
         return true;
      }

      return this.name === other.name &&
            this.albumGroup === other.albumGroup &&
            this.albumType === other.albumType &&
            this.totalTracks === other.totalTracks &&
            this.releaseDate === other.releaseDate &&
            this.releaseDatePrecision === other.releaseDatePrecision;
    }
 
    public static get Builder(): AlbumDaoBuilder {
       return new AlbumDaoBuilder();
    }
    
 }
 
 class AlbumDaoBuilder {
    private _id!: number;
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumType!: string | null;
    private _albumGroup!: string | null;
    private _totalTracks!: number | null;
    private _releaseDate!: Date | null;
    private _releaseDatePrecision!: string | null;
    private _images!: Set<ImageDao>;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    public withId(id: number): AlbumDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): AlbumDaoBuilder {
       this._name = name;
       return this;
    }
 
    public withArtistIds(artistIds: Set<number>): AlbumDaoBuilder {
       this._artistIds = new Set(artistIds);
       return this;
    }
 
    public withAlbumType(albumType: string | null): AlbumDaoBuilder {
       this._albumType = albumType;
       return this;
    }
 
    public withAlbumGroup(albumGroup: string | null): AlbumDaoBuilder {
       this._albumGroup = albumGroup;
       return this;
    }

    public withTotalTracks(totalTracks: number | null): AlbumDaoBuilder {
      this._totalTracks = totalTracks;
      return this;
    }
 
    public withReleaseDate(releaseDate: Date | null): AlbumDaoBuilder {
       this._releaseDate = releaseDate;
       return this;
    }
 
    public withReleaseDatePrecision(releaseDatePrecision: string | null): AlbumDaoBuilder {
       this._releaseDatePrecision = releaseDatePrecision;
       return this;
    }
 
    public withImages(images: Set<ImageDao>): AlbumDaoBuilder {
       this._images = new Set(images);
       return this;
    }
 
    public withCreatedAt(createdAt: Date): AlbumDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public withUpdatedAt(updatedAt: Date | null): AlbumDaoBuilder {
       this._updatedAt = updatedAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
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
 
    public get images(): Set<ImageDao> {
       return new Set(this._images);
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    build(): AlbumDao {
       return new AlbumDao(this);
    }
 }