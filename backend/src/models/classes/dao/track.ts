export class TrackDao {
    private _id!: number;
    private _name!: string;
    private _artistIds!: number[];
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _bucket!: number;
    private _discNumber!: number | null;
    private _trackNumber!: number | null;
    private _durationMs!: number | null;
    private _explicit!: boolean | null;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    constructor(builder: TrackDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
       this._artistIds = [...builder.artistIds];
       this._albumId = builder.albumId;
       this._isrc = builder.isrc;
       this._bucket = builder.bucket;
       this._discNumber = builder.discNumber;
       this._trackNumber = builder.trackNumber;
       this._durationMs = builder.durationMs;
       this._explicit = builder.explicit;
       this._createdAt = builder.createdAt;
       this._updatedAt = builder.updatedAt;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get artistIds(): number[] {
       return [...this._artistIds];
    }
 
    public get albumId(): number | null {
       return this._albumId;
    }
 
    public get isrc(): string | null {
       return this._isrc;
    }

    public get bucket(): number {
      return this._bucket;
    }
 
    public get discNumber(): number | null {
       return this._discNumber;
    }
 
    public get trackNumber(): number | null {
       return this._trackNumber;
    }
 
    public get durationMs(): number | null {
       return this._durationMs;
    }
 
    public get explicit(): boolean | null {
       return this._explicit;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }

    public areUpdateablePropertiesEqual(other: TrackDao): boolean {
        if (other === null) {
            return false;
        }
    
        if (this === other) {
            return true;
        }
    
        return this.name === other.name
            && this.albumId === other.albumId
            && this.isrc === other.isrc
            && this.discNumber === other.discNumber
            && this.trackNumber === other.trackNumber
            && this.durationMs === other.durationMs
            && this.explicit === other.explicit;
    }
 
    public static get Builder(): TrackDaoBuilder {
       return new TrackDaoBuilder();
    }
 }
 
 class TrackDaoBuilder {
    private _id!: number;
    private _name!: string;
    private _artistIds!: number[];
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _bucket!: number;
    private _discNumber!: number | null;
    private _trackNumber!: number | null;
    private _durationMs!: number | null;
    private _explicit!: boolean | null;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    public withId(id: number): TrackDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): TrackDaoBuilder {
       this._name = name;
       return this;
    }
 
    public withArtistIds(artistIds: number[]): TrackDaoBuilder {
       this._artistIds = [...artistIds];
       return this;
    }
 
    public withAlbumId(albumId: number | null): TrackDaoBuilder {
       this._albumId = albumId;
       return this;
    }
 
    public withIsrc(isrc: string | null): TrackDaoBuilder {
       this._isrc = isrc;
       return this;
    }

    public withBucket(bucket: number): TrackDaoBuilder {
      this._bucket = bucket;
      return this;
    }
 
    public withDiscNumber(discNumber: number | null): TrackDaoBuilder {
       this._discNumber = discNumber;
       return this;
    }
 
    public withTrackNumber(trackNumber: number | null): TrackDaoBuilder {
       this._trackNumber = trackNumber;
       return this;
    }
 
    public withDurationMs(durationMs: number | null): TrackDaoBuilder {
       this._durationMs = durationMs;
       return this;
    }
 
    public withExplicit(explicit: boolean | null): TrackDaoBuilder {
       this._explicit = explicit;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): TrackDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public withUpdatedAt(updatedAt: Date | null): TrackDaoBuilder {
       this._updatedAt = updatedAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get artistIds(): number[] {
       return [...this._artistIds];
    }
 
    public get albumId(): number | null {
       return this._albumId;
    }
 
    public get isrc(): string | null {
       return this._isrc;
    }

    public get bucket(): number {
      return this._bucket;
    }
 
    public get discNumber(): number | null {
       return this._discNumber;
    }
 
    public get trackNumber(): number | null {
       return this._trackNumber;
    }
 
    public get durationMs(): number | null {
       return this._durationMs;
    }
 
    public get explicit(): boolean | null {
       return this._explicit;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    build(): TrackDao {
       return new TrackDao(this);
    }
 }