class Track {
    private id!: number;
    private name!: string;
    private artistIds!: Set<number>;
    private albumId!: number;
    private isrc!: string;
    private discNumber!: number;
    private durationMs!: number;
    private createdAt!: Date;

    constructor(
        id: number,
        name: string,
        artistIds: Set<number>,
        albumId: number,
        isrc: string,
        discNumber: number,
        durationMs: number,
        createdAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.artistIds = artistIds,
        this.albumId = albumId;
        this.isrc = isrc;
        this.discNumber = discNumber;
        this.durationMs = durationMs;
        this.createdAt = createdAt;
    }
    
    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getArtistIds(): Set<number> {
        return this.artistIds;
    }

    public getAlbumId(): number {
        return this.albumId;
    }

    public getIsrc(): string {
        return this.isrc;
    }

    public getDiscNumber(): number {
        return this.discNumber;
    }

    public getDurationMs(): number {
        return this.durationMs;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}

class TrackBuilder {
    public id!: number;
    public name!: string;
    public artistIds!: Set<number>;
    public albumId!: number;
    public isrc!: string;
    public discNumber!: number;
    public durationMs!: number;
    public createdAt!: Date;

    setId(id: number) {
        this.id = id;
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setArtistIds(artistIds: Set<number>) {
        this.artistIds = artistIds;
        return this;
    }

    setAlbumId(albumId: number) {
        this.albumId = albumId;
        return this;
    }

    setIsrc(isrc: string) {
        this.isrc = isrc;
        return this;
    }

    setDiscNumber(discNumber: number) {
        this.discNumber = discNumber;
        return this;
    }

    setDurationMs(durationMs: number) {
        this.durationMs = durationMs;
        return this;
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    build() {
        return new Track(
            this.id,
            this.name,
            this.artistIds,
            this.albumId,
            this.isrc,
            this.discNumber,
            this.durationMs,
            this.createdAt,
        );
    }
}