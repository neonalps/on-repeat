class AlbumImage {
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

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getUrl(): string {
        return this.url;
    }

    public equals(other: AlbumImage): boolean {
        if (other === this) {
            return true;
        }

        if (other === null) {
            return false;
        }

        return this.height === other.getHeight()
            && this.width === other.getWidth()
            && this.url === other.getUrl();
    }
}

class AlbumImageBuilder {
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
    
    build() {
        return new AlbumImage(
            this.height,
            this.width,
            this.url,
        );
    }
}