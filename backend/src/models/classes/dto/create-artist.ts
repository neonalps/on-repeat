class CreateArtistDto {
    private _name: string;
  
    constructor(builder: CreateArtistDtoBuilder) {
      this._name = builder.name;
    }

    public get name(): string {
      return this._name;
    }
  
    public static get Builder(): CreateArtistDtoBuilder {
      return new CreateArtistDtoBuilder();
    }

    public static createFromArtistDao(dao: ArtistDao): CreateArtistDto {
        return this.Builder
            .withName(dao.name)
            .build();
    }
  }
  
  class CreateArtistDtoBuilder {
    private _name!: string;
  
    public withName(name: string): CreateArtistDtoBuilder {
      this._name = name;
      return this;
    }
  
    public get name(): string {
      return this._name;
    }
  
    public build(): CreateArtistDto {
      return new CreateArtistDto(this);
    }
  }
  