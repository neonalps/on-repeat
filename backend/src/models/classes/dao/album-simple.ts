import { AlbumDao } from "@src/models/classes/dao/album";
import { ImageDao } from "@src/models/classes/dao/image";

export class SimpleAlbumDao {
   private _id!: number;
   private _name!: string;
   private _images!: Set<ImageDao>;

   constructor(builder: SimpleAlbumDaoBuilder) {
      this._id = builder.id;
      this._name = builder.name;
      this._images = new Set(builder.images);
   }

   public get id(): number {
      return this._id;
   }

   public get name(): string {
      return this._name;
   }

   public get images(): Set<ImageDao> {
      return new Set(this._images);
   }

   public static get Builder(): SimpleAlbumDaoBuilder {
      return new SimpleAlbumDaoBuilder();
   }

   public static fromAlbumDao(item: AlbumDao): SimpleAlbumDao {
      return this.Builder
         .withId(item.id)
         .withName(item.name)
         .withImages(item.images)
         .build();
   }
}

class SimpleAlbumDaoBuilder {
   private _id!: number;
   private _name!: string;
   private _images!: Set<ImageDao>;

   public withId(id: number): SimpleAlbumDaoBuilder {
      this._id = id;
      return this;
   }

   public withName(name: string): SimpleAlbumDaoBuilder {
      this._name = name;
      return this;
   }

   public withImages(images: Set<ImageDao>): SimpleAlbumDaoBuilder {
      this._images = new Set(images);
      return this;
   }

   public get id(): number {
      return this._id;
   }

   public get name(): string {
      return this._name;
   }

   public get images(): Set<ImageDao> {
      return new Set(this._images);
   }

   build(): SimpleAlbumDao {
      return new SimpleAlbumDao(this);
   }
}