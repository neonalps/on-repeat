import { TrackDao } from "../dao/track";

export class CreateTrackDto {
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _durationMs!: number | null;

    constructor(builder: CreateTrackDtoBuilder) {
        this._name = builder.name;
        this._artistIds = new Set(builder.artistIds);
        this._albumId = builder.albumId;
        this._isrc = builder.isrc;
        this._discNumber = builder.discNumber;
        this._durationMs = builder.durationMs;
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

    public static get Builder(): CreateTrackDtoBuilder {
        return new CreateTrackDtoBuilder();
    }

    public static createFromTrackDao(dao: TrackDao): CreateTrackDto {
        return this.Builder
            .withName(dao.name)
            .withArtistIds(dao.artistIds)
            .withAlbumId(dao.albumId)
            .withIsrc(dao.isrc)
            .withDiscNumber(dao.discNumber)
            .withDurationMs(dao.durationMs)
            .build();
    }
}

class CreateTrackDtoBuilder {
    private _name!: string;
    private _artistIds!: Set<number>;
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _durationMs!: number | null;

    public withName(name: string): CreateTrackDtoBuilder {
        this._name = name;
        return this;
    }

    public withArtistIds(artistIds: Set<number>): CreateTrackDtoBuilder {
        this._artistIds = artistIds;
        return this;
    }

    public withAlbumId(albumId: number | null): CreateTrackDtoBuilder {
        this._albumId = albumId;
        return this;
    }

    public withIsrc(isrc: string | null): CreateTrackDtoBuilder {
        this._isrc = isrc;
        return this;
    }

    public withDiscNumber(discNumber: number | null): CreateTrackDtoBuilder {
        this._discNumber = discNumber;
        return this;
    }

    public withDurationMs(durationMs: number | null): CreateTrackDtoBuilder {
        this._durationMs = durationMs;
        return this;
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

    build(): CreateTrackDto {
        return new CreateTrackDto(this);
    }
}