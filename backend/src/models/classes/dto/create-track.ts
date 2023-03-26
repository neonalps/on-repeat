class CreateTrackDto {
    private name!: string;
    private artistIds!: Set<number>;
    private albumId!: number;
    private isrc!: string;
    private discNumber!: number;
    private durationMs!: number;

    constructor(
        name: string,
        artistIds: Set<number>,
        albumId: number,
        isrc: string,
        discNumber: number,
        durationMs: number,
    ) {
        this.name = name;
        this.artistIds = artistIds;
        this.albumId = albumId;
        this.isrc = isrc;
        this.discNumber = discNumber;
        this.durationMs = durationMs;
    }

    public getName() {
        return this.name;
    }

    public getArtistIds() {
        return this.artistIds;
    }

    public getAlbumId() {
        return this.albumId;
    }

    public getIsrc() {
        return this.isrc;
    }

    public getDiscNumber() {
        return this.discNumber;
    }

    public getDurationMs() {
        return this.durationMs;
    }
}

class CreateTrackDtoBuilder {
    private name!: string;
    private artistIds!: Set<number>;
    private albumId!: number;
    private isrc!: string;
    private discNumber!: number;
    private durationMs!: number;

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setArtistIds(artistIds: Set<number>) {
        this.artistIds = artistIds;
        return this;
    }

    public setAlbumId(albumId: number) {
        this.albumId = albumId;
        return this;
    }

    public setIsrc(isrc: string) {
        this.isrc = isrc;
        return this;
    }

    public setDiscNumber(discNumber: number) {
        this.discNumber = discNumber;
        return this;
    }

    public setDurationMs(durationMs: number) {
        this.durationMs = durationMs;
        return this;
    }

    build() {
        return new CreateTrackDto(
            this.name,
            this.artistIds,
            this.albumId,
            this.isrc,
            this.discNumber,
            this.durationMs,
        )
    }
}