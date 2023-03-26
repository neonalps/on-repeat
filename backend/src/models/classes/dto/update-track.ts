class UpdateTrackDto {
    private name!: string;
    private albumId!: number;
    private isrc!: string;
    private discNumber!: number;
    private durationMs!: number;

    constructor(
        name: string,
        albumId: number,
        isrc: string,
        discNumber: number,
        durationMs: number,
    ) {
        this.name = name;
        this.albumId = albumId;
        this.isrc = isrc;
        this.discNumber = discNumber;
        this.durationMs = durationMs;
    }

    public getName() {
        return this.name;
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

class UpdateTrackDtoBuilder {
    private name!: string;
    private albumId!: number;
    private isrc!: string;
    private discNumber!: number;
    private durationMs!: number;

    public setName(name: string) {
        this.name = name;
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
        return new UpdateTrackDto(
            this.name,
            this.albumId,
            this.isrc,
            this.discNumber,
            this.durationMs,
        )
    }
}