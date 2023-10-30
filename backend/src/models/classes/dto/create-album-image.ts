import { ImageDao } from "@src/models/classes/dao/image";

export class CreateAlbumImageDto {
    private _height!: number;
    private _width!: number;
    private _url!: string;
 
    constructor(builder: CreateAlbumImageDtoBuilder) {
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
 
    public static get Builder(): CreateAlbumImageDtoBuilder {
       return new CreateAlbumImageDtoBuilder();
    }

    public static fromDao(dao: ImageDao): CreateAlbumImageDto | null {
        if (!dao) {
            return null;
        }

        return this.Builder
            .withHeight(dao.height)
            .withWidth(dao.width)
            .withUrl(dao.url)
            .build();
    }
 }
 
 class CreateAlbumImageDtoBuilder {
    private _height!: number;
    private _width!: number;
    private _url!: string;
 
    public withHeight(height: number): CreateAlbumImageDtoBuilder {
       this._height = height;
       return this;
    }
 
    public withWidth(width: number): CreateAlbumImageDtoBuilder {
       this._width = width;
       return this;
    }
 
    public withUrl(url: string): CreateAlbumImageDtoBuilder {
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
 
    build(): CreateAlbumImageDto {
       return new CreateAlbumImageDto(this);
    }
 }