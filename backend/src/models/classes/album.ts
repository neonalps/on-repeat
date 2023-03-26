class Album {
    constructor(
        id: number,
        name: string,
        albumType: string,
        albumGroup: string,
        releaseDay: Date,
        releaseDayPrecision: string,
        createdAt: Date,
    ) {}
}

class AlbumBuilder {
    public id!: number;
    public name!: string;
    public albumType!: string;
    public albumGroup!: string;
    public releaseDay!: Date;
    public releaseDayPrecision!: string;
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

    setReleaseDay(releaseDay: Date) {
        this.releaseDay = releaseDay;
        return this;
    }

    setReleaseDayPrecision(releaseDayPrecision: string) {
        this.releaseDayPrecision = releaseDayPrecision;
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
            this.releaseDay,
            this.releaseDayPrecision,
            this.createdAt,
        );
    }
}