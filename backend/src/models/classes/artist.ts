class Artist {
    constructor(
        id: number,
        name: string,
        createdAt: Date,
    ) {}
}

class ArtistBuilder {
    public id!: number;
    public name!: string;
    public createdAt!: Date;

    setId(id: number) {
        this.id = id;
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    build() {
        return new Artist(
            this.id,
            this.name,
            this.createdAt,
        );
    }
}