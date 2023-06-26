import { ImageDao } from "@src/models/classes/dao/image";

export class ArtistDao {
  private _id!: number;
  private _name!: string;
  private _images!: Set<ImageDao>;
  private _createdAt!: Date;
  private _updatedAt!: Date | null;

  constructor(builder: ArtistDaoBuilder) {
     this._id = builder.id;
     this._name = builder.name;
     this._images = new Set(builder.images);
     this._createdAt = builder.createdAt;
     this._updatedAt = builder.updatedAt;
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

  public get createdAt(): Date {
     return this._createdAt;
  }

  public get updatedAt(): Date | null {
     return this._updatedAt;
  }

  public areUpdateablePropertiesEqual(other: ArtistDao): boolean {
    if (!other) {
      return false;
    }

    if (this === other) {
      return true;
    }

    return this.name === other.name;
  }

  public static get Builder(): ArtistDaoBuilder {
     return new ArtistDaoBuilder();
  }
}

class ArtistDaoBuilder {
  private _id!: number;
  private _name!: string;
  private _images!: Set<ImageDao>;
  private _createdAt!: Date;
  private _updatedAt!: Date | null;

  public withId(id: number): ArtistDaoBuilder {
     this._id = id;
     return this;
  }

  public withName(name: string): ArtistDaoBuilder {
     this._name = name;
     return this;
  }

  public withImages(images: Set<ImageDao>): ArtistDaoBuilder {
     this._images = new Set(images);
     return this;
  }

  public withCreatedAt(createdAt: Date): ArtistDaoBuilder {
     this._createdAt = createdAt;
     return this;
  }

  public withUpdatedAt(updatedAt: Date | null): ArtistDaoBuilder {
     this._updatedAt = updatedAt;
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

  public get createdAt(): Date {
     return this._createdAt;
  }

  public get updatedAt(): Date | null {
     return this._updatedAt;
  }

  build(): ArtistDao {
     return new ArtistDao(this);
  }
}