class UpdateAlbumDto {
    private name!: string;
    private type!: string;
    private albumType!: string;
    private albumGroup!: string;
    private releaseDate!: Date | null;
    private releaseDatePrecision!: string | null;

    constructor(
        name: string,
        type: string,
        albumType: string,
        albumGroup: string,
        releaseDate: Date | null,
        releaseDatePrecision: string | null,
    ) {
        this.name = name;
        this.type = type;
        this.albumType = albumType;
        this.albumGroup = albumGroup;
        this.releaseDate = releaseDate;
        this.releaseDatePrecision = releaseDatePrecision;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getAlbumType(): string {
        return this.albumType;
    }

    public getAlbumGroup(): string {
        return this.albumGroup;
    }

    public getReleaseDate(): Date | null {
        return this.releaseDate;
    }

    public getReleaseDatePrecision(): string | null {
        return this.releaseDatePrecision;
    }
}

class UpdateAlbumDtoBuilder {
    private name!: string;
    private type!: string;
    private albumType!: string;
    private albumGroup!: string;
    private releaseDate!: Date | null;
    private releaseDatePrecision!: string | null;

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setType(type: string) {
        this.type = type;
        return this;
    }

    public setAlbumType(albumType: string) {
        this.albumType = albumType;
        return this;
    }

    public setAlbumGroup(albumGroup: string) {
        this.albumGroup = albumGroup;
        return this;
    }

    public setReleaseDate(releaseDate: Date | null) {
        this.releaseDate = releaseDate;
        return this;
    }

    public setReleaseDatePrecision(releaseDatePrecision: string | null) {
        this.releaseDatePrecision = releaseDatePrecision;
        return this;
    }

    build() {
        return new UpdateAlbumDto(
            this.name,
            this.type,
            this.albumType,
            this.albumGroup,
            this.releaseDate,
            this.releaseDatePrecision,
        )
    }
}