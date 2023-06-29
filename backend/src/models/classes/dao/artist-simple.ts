import { ImageDao } from "@src/models/classes/dao/image";
import { ArtistDao } from "@src/models/classes/dao/artist";

export class SimpleArtistDao {
   private _id!: number;
   private _name!: string;
   private _images!: ImageDao[];

   constructor(builder: SimpleArtistDaoBuilder) {
      this._id = builder.id;
      this._name = builder.name;
      this._images = [...builder.images];
   }

   public get id(): number {
      return this._id;
   }

   public get name(): string {
      return this._name;
   }

   public get images(): ImageDao[] {
      return [...this._images];
   }

   public static get Builder(): SimpleArtistDaoBuilder {
      return new SimpleArtistDaoBuilder();
   }

   public static fromArtistDao(item: ArtistDao): SimpleArtistDao {
      return this.Builder
         .withId(item.id)
         .withName(item.name)
         .withImages(item.images)
         .build();
   }
}

class SimpleArtistDaoBuilder {
   private _id!: number;
   private _name!: string;
   private _images!: ImageDao[];

   public withId(id: number): SimpleArtistDaoBuilder {
      this._id = id;
      return this;
   }

   public withName(name: string): SimpleArtistDaoBuilder {
      this._name = name;
      return this;
   }

   public withImages(images: ImageDao[]): SimpleArtistDaoBuilder {
      this._images = [...images];
      return this;
   }

   public get id(): number {
      return this._id;
   }

   public get name(): string {
      return this._name;
   }

   public get images(): ImageDao[] {
      return [...this._images];
   }

   build(): SimpleArtistDao {
      return new SimpleArtistDao(this);
   }
}