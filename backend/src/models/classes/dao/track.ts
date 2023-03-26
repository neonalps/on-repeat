class TrackDao {
    private id!: number;
    private name!: string;
    private albumId!: number | null;
    private artistIds!: Set<number>;
    private isrc!: string | null;
    private discNumber!: number | null;
    private durationMs!: number | null;
    private createdAt!: Date;

    constructor(
        id: number,
        name: string,
        albumId: number | null,
        artistIds: Set<number> | null,
        isrc: string | null,
        discNumber: number | null,
        durationMs: number | null,
        createdAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.albumId = albumId;
        this.setArtistIds(artistIds);
        this.isrc = isrc;
        this.discNumber = discNumber;
        this.durationMs = durationMs;
        this.createdAt = createdAt;
    }

    public setArtistIds(artistIds: Set<number> | null) {
        if (!artistIds) {
            this.artistIds = new Set();
            return;
        }

        this.artistIds = artistIds;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getAlbumId(): number | null {
        return this.albumId;
    }

    public getArtistIds(): Set<number> {
        return this.artistIds;
    }

    public getIsrc(): string | null {
        return this.isrc;
    }

    public getDiscNumber(): number | null {
        return this.discNumber;
    }

    public getDurationMs(): number | null {
        return this.durationMs;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}

class TrackDaoBuilder {
    private id!: number;
    private name!: string;
    private albumId!: number | null;
    private artistIds!: Set<number> | null;
    private isrc!: string | null;
    private discNumber!: number | null;
    private durationMs!: number | null;
    private createdAt!: Date;

    setId(id: number) {
        this.id = id;
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setAlbumId(albumId: number | null) {
        this.albumId = albumId;
        return this;
    }

    setArtistIds(artistIds: Set<number> | null) {
        this.artistIds = artistIds;
        return this;
    }

    setIsrc(isrc: string | null) {
        this.isrc = isrc;
        return this;
    }

    setDiscNumber(discNumber: number | null) {
        this.discNumber = discNumber;
        return this;
    }

    setDurationMs(durationMs: number | null) {
        this.durationMs = durationMs;
        return this;
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    build() {
        return new TrackDao(
            this.id,
            this.name,
            this.albumId,
            this.artistIds,
            this.isrc,
            this.discNumber,
            this.durationMs,
            this.createdAt,
        )
    }
}