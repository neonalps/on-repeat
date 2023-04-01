class AlbumDao {
    private id!: number;
    private name!: string;
    private artistIds!: Set<number>;
    private type!: string;
    private albumType!: string;
    private albumGroup!: string;
    private releaseDate!: Date | null;
    private releaseDatePrecision!: string | null;
    private images!: Set<AlbumImage>;
    private createdAt!: Date;

    constructor(
        id: number,
        name: string,
        artistIds: Set<number> | null,
        type: string,
        albumType: string,
        albumGroup: string,
        releaseDate: Date | null,
        releaseDatePrecision: string | null,
        images: Set<AlbumImage> | null,
        createdAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.setArtistIds(artistIds);
        this.type = type;
        this.albumType = albumType;
        this.albumGroup = albumGroup;
        this.releaseDate = releaseDate;
        this.releaseDatePrecision = releaseDatePrecision;
        this.setImages(images);
        this.createdAt = createdAt;
    }

    public setArtistIds(artistIds: Set<number> | null) {
        if (!artistIds) {
            this.artistIds = new Set();
            return;
        }

        this.artistIds = artistIds;
    }

    public setImages(images: Set<AlbumImage> | null) {
        if (!images) {
            this.images = new Set();
            return;
        }

        this.images = images;
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

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}

class AlbumDaoBuilder {
    private id!: number;
    private name!: string;
    private artistIds!: Set<number> | null;
    private type!: string;
    private albumType!: string;
    private albumGroup!: string;
    private releaseDate!: Date | null;
    private releaseDatePrecision!: string | null;
    private images!: Set<AlbumImage> | null;
    private createdAt!: Date;

    setId(id: number) {
        this.id = id;
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setArtistIds(artistIds: Set<number> | null) {
        this.artistIds = artistIds;
        return this;
    }

    setType(type: string) {
        this.type = type;
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

    setReleaseDate(releaseDate: Date | null) {
        this.releaseDate = releaseDate;
        return this;
    }

    setReleaseDatePrecision(releaseDatePrecision: string | null) {
        this.releaseDatePrecision = releaseDatePrecision;
        return this;
    }

    setImages(images: Set<AlbumImage> | null) {
        this.images = images;
        return this;
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    build() {
        return new AlbumDao(
            this.id,
            this.name,
            this.artistIds,
            this.type,
            this.albumType,
            this.albumGroup,
            this.releaseDate,
            this.releaseDatePrecision,
            this.images,
            this.createdAt,
        )
    }
}