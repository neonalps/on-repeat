class Album {
    constructor(
        id: number,
        name: string,
        albumType: string,
        albumGroup: string,
        releaseDate: Date,
        releaseDatePrecision: string,
        createdAt: Date,
    ) {}
}

class AlbumBuilder {
    public id!: number;
    public name!: string;
    public albumType!: string;
    public albumGroup!: string;
    public releaseDate!: Date;
    public releaseDatePrecision!: string;
    public createdAt!: Date;

    setId(id: number) {
        this.id = id;
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setAlbumType(albumType: string) {
        this.albumType = albumType;
        return this;
    }

    setAlbumGroup(albumGroup: string) {
        this.albumGroup = albumGroup;
        return this;
    }

    setReleaseDate(releaseDate: Date) {
        this.releaseDate = releaseDate;
        return this;
    }

    setReleaseDatePrecision(releaseDatePrecision: string) {
        this.releaseDatePrecision = releaseDatePrecision;
        return this;
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    build() {
        return new Album(
            this.id,
            this.name,
            this.albumType,
            this.albumGroup,
            this.releaseDate,
            this.releaseDatePrecision,
            this.createdAt,
        );
    }
}