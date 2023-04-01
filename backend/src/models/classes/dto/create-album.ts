class CreateAlbumDto {
    private name!: string;
    private artistIds!: Set<number>;
    private type!: string;
    private albumType!: string;
    private albumGroup!: string;
    private releaseDate!: Date | null;
    private releaseDatePrecision!: string | null;
    private images!: Set<AlbumImage>;

    constructor(
        name: string,
        artistIds: Set<number>,
        type: string,
        albumType: string,
        albumGroup: string,
        releaseDate: Date | null,
        releaseDatePrecision: string | null,
        images: Set<AlbumImage>,
    ) {
        this.name = name;
        this.artistIds = artistIds;
        this.type = type;
        this.albumType = albumType;
        this.albumGroup = albumGroup;
        this.releaseDate = releaseDate;
        this.releaseDatePrecision = releaseDatePrecision;
        this.images = images;
    }

    public getName(): string {
        return this.name;
    }

    public getArtistIds(): Set<number> {
        return this.artistIds;
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

    public getImages(): Set<AlbumImage> {
        return this.images;
    }
}

class CreateAlbumDtoBuilder {
    private name!: string;
    private artistIds!: Set<number>;
    private type!: string;
    private albumType!: string;
    private albumGroup!: string;
    private releaseDate!: Date | null;
    private releaseDatePrecision!: string | null;
    private images!: Set<AlbumImage>;

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setArtistIds(artistIds: Set<number>) {
        this.artistIds = artistIds;
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
        return new CreateAlbumDto(
            this.name,
            this.artistIds,
            this.type,
            this.albumType,
            this.albumGroup,
            this.releaseDate,
            this.releaseDatePrecision,
            this.images,
        )
    }
}