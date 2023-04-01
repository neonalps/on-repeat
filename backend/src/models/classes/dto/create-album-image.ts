class CreateAlbumImageDto {
    private height!: number;
    private width!: number;
    private url!: string;
    
    constructor(
        height: number,
        width: number,
        url: string,
    ) {
        this.height = height;
        this.width = width;
        this.url = url;
    }

    public getHeight(): number {
        return this.height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getUrl(): string {
        return this.url;
    }
}

class CreateAlbumImageDtoBuilder {
    private height!: number;
    private width!: number;
    private url!: string;
    
    public setHeight(height: number) {
        this.height = height;
        return this;
    }

    public setWidth(width: number) {
        this.width = width;
        return this;
    }

    public setUrl(url: string) {
        this.url = url;
        return this;
    }

    build(): CreateAlbumImageDto {
        return new CreateAlbumImageDto(
            this.height,
            this.width,
            this.url,
        );
    }
}