import { AlbumImageDaoInterface } from "@src/models/dao/album-image.dao";
import { ImageDto } from "@src/models/dto/image";

export class AlbumImageDao {
    private _height!: number;
    private _width!: number;
    private _url!: string;
 
    constructor(builder: AlbumImageDaoBuilder) {
       this._height = builder.height;
       this._width = builder.width;
       this._url = builder.url;
    }
 
    public get height(): number {
       return this._height;
    }
 
    public get width(): number {
       return this._width;
    }
 
    public get url(): string {
       return this._url;
    }

    public equals(other: AlbumImageDao): boolean {
        if (!other) {
            return false;
        }

        if (this === other) {
            return true;
        }

        return this.height === other.height &&
            this.width === other.width &&
            this.url === other.url;
    }
 
    public static get Builder(): AlbumImageDaoBuilder {
       return new AlbumImageDaoBuilder();
    }

    public static fromInterface(item: AlbumImageDaoInterface | ImageDto): AlbumImageDao | null {
        if (!item) {
            return null;
        }

        return this.Builder
            .withHeight(item.height)
            .withWidth(item.width)
            .withUrl(item.url)
            .build();
    }
 }
 
 class AlbumImageDaoBuilder {
    private _height!: number;
    private _width!: number;
    private _url!: string;
 
    public withHeight(height: number): AlbumImageDaoBuilder {
       this._height = height;
       return this;
    }
 
    public withWidth(width: number): AlbumImageDaoBuilder {
       this._width = width;
       return this;
    }
 
    public withUrl(url: string): AlbumImageDaoBuilder {
       this._url = url;
       return this;
    }
 
    public get height(): number {
       return this._height;
    }
 
    public get width(): number {
       return this._width;
    }
 
    public get url(): string {
       return this._url;
    }
 
    build(): AlbumImageDao {
       return new AlbumImageDao(this);
    }
 }