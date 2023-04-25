import { setEquals } from "@src/util/collection";

export class TrackDao {
    private _id!: number;
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _durationMs!: number | null;
    private _createdAt!: Date;

    constructor(builder: TrackDaoBuilder) {
        this._id = builder.id;
        this._name = builder.name;
        this._artistIds = new Set(builder.artistIds);
        this._albumId = builder.albumId;
        this._isrc = builder.isrc;
        this._discNumber = builder.discNumber;
        this._durationMs = builder.durationMs;
        this._createdAt = builder.createdAt;
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

    public get albumId(): number | null {
        return this._albumId;
    }

    public get isrc(): string | null {
        return this._isrc;
    }

    public get discNumber(): number | null {
        return this._discNumber;
    }

    public get durationMs(): number | null {
        return this._durationMs;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public areUpdateablePropertiesEqual(other: TrackDao): boolean {
        if (this === other) {
            return true;
        }

        if (other === null) {
            return false;
        }

        return this.name === other.name
            && this.albumId === other.albumId
            && this.isrc === other.isrc
            && setEquals(this.artistIds, other.artistIds)
            && this.discNumber === other.discNumber
            && this.durationMs === other.durationMs;
    }

    public static get Builder(): TrackDaoBuilder {
        return new TrackDaoBuilder();
    }
}

class TrackDaoBuilder {
    private _id!: number;
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _durationMs!: number | null;
    private _createdAt!: Date;

    public withId(id: number): TrackDaoBuilder {
        this._id = id;
        return this;
    }

    public withName(name: string): TrackDaoBuilder {
        this._name = name;
        return this;
    }

    public withArtistIds(artistIds: Set<number>): TrackDaoBuilder {
        this._artistIds = artistIds;
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

    public withDiscNumber(discNumber: number | null): TrackDaoBuilder {
        this._discNumber = discNumber;
        return this;
    }

    public withDurationMs(durationMs: number | null): TrackDaoBuilder {
        this._durationMs = durationMs;
        return this;
    }

    public withCreatedAt(createdAt: Date): TrackDaoBuilder {
        this._createdAt = createdAt;
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

    public get albumId(): number | null {
        return this._albumId;
    }

    public get isrc(): string | null {
        return this._isrc;
    }

    public get discNumber(): number | null {
        return this._discNumber;
    }

    public get durationMs(): number | null {
        return this._durationMs;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    build(): TrackDao {
        return new TrackDao(this);
    }
}