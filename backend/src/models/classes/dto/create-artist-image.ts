import { CreateArtistImageDaoInterface } from "@src/models/dao/create-artist-image.dao";

export class CreateArtistImageDto {
   private _artistId!: number;
   private _height!: number;
   private _width!: number;
   private _url!: string;

   constructor(builder: CreateArtistImageDtoBuilder) {
      this._artistId = builder.artistId;
      this._height = builder.height;
      this._width = builder.width;
      this._url = builder.url;
   }

   public get artistId(): number {
      return this._artistId;
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

   public convertToDaoInterface(): CreateArtistImageDaoInterface {
      return {
         artistId: this.artistId,
         height: this.height,
         width: this.width,
         url: this.url,
      };
   }

   public static get Builder(): CreateArtistImageDtoBuilder {
      return new CreateArtistImageDtoBuilder();
   }
}

class CreateArtistImageDtoBuilder {
   private _artistId!: number;
   private _height!: number;
   private _width!: number;
   private _url!: string;

   public withArtistId(artistId: number): CreateArtistImageDtoBuilder {
      this._artistId = artistId;
      return this;
   }

   public withHeight(height: number): CreateArtistImageDtoBuilder {
      this._height = height;
      return this;
   }

   public withWidth(width: number): CreateArtistImageDtoBuilder {
      this._width = width;
      return this;
   }

   public withUrl(url: string): CreateArtistImageDtoBuilder {
      this._url = url;
      return this;
   }

   public get artistId(): number {
      return this._artistId;
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

   build(): CreateArtistImageDto {
      return new CreateArtistImageDto(this);
   }
}