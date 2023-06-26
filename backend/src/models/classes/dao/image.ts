import { AlbumImageDaoInterface } from "@src/models/dao/album-image.dao";
import { ImageDto } from "@src/models/dto/image";

export class ImageDao {
    private _height!: number;
    private _width!: number;
    private _url!: string;
 
    constructor(builder: ImageDaoBuilder) {
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

    public equals(other: ImageDao): boolean {
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
 
    public static get Builder(): ImageDaoBuilder {
       return new ImageDaoBuilder();
    }

    public static fromInterface(item: AlbumImageDaoInterface | ImageDto): ImageDao | null {
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
 
 class ImageDaoBuilder {
    private _height!: number;
    private _width!: number;
    private _url!: string;
 
    public withHeight(height: number): ImageDaoBuilder {
       this._height = height;
       return this;
    }
 
    public withWidth(width: number): ImageDaoBuilder {
       this._width = width;
       return this;
    }
 
    public withUrl(url: string): ImageDaoBuilder {
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
 
    build(): ImageDao {
       return new ImageDao(this);
    }
 }