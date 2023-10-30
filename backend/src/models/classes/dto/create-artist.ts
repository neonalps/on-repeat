import { CreateArtistImageDto } from "@src/models/classes/dto/create-artist-image";

export class CreateArtistDto {
    private _name: string;
    private _images!: Set<CreateArtistImageDto>;
  
    constructor(builder: CreateArtistDtoBuilder) {
      this._name = builder.name;
      this._images = new Set(builder.images);
    }

    public get name(): string {
      return this._name;
    }

    public get images(): Set<CreateArtistImageDto> {
      return new Set(this._images);
    }
  
    public static get Builder(): CreateArtistDtoBuilder {
      return new CreateArtistDtoBuilder();
    }
  }
  
  class CreateArtistDtoBuilder {
    private _name!: string;
    private _images!: Set<CreateArtistImageDto>;
  
    public withName(name: string): CreateArtistDtoBuilder {
      this._name = name;
      return this;
    }

    public withImages(images: Set<CreateArtistImageDto>): CreateArtistDtoBuilder {
      this._images = new Set(images);
      return this;
    }

    public get name(): string {
      return this._name;
    }

    public get images(): Set<CreateArtistImageDto> {
      return new Set(this._images);
    }

    public build(): CreateArtistDto {
      return new CreateArtistDto(this);
    }
  }
  