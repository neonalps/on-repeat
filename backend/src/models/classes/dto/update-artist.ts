class UpdateArtistDto {
    private _name: string;
  
    constructor(builder: UpdateArtistDtoBuilder) {
      this._name = builder.name;
    }

    public get name(): string {
      return this._name;
    }
  
    public static get Builder(): UpdateArtistDtoBuilder {
      return new UpdateArtistDtoBuilder();
    }

    public static createFromArtistDao(dto: ArtistDao): UpdateArtistDto {
        return this.Builder
            .withName(dto.name)
            .build();
    }
  }
  
  class UpdateArtistDtoBuilder {
    private _name!: string;
  
    public withName(name: string): UpdateArtistDtoBuilder {
      this._name = name;
      return this;
    }
  
    public get name(): string {
      return this._name;
    }
  
    public build(): UpdateArtistDto {
      return new UpdateArtistDto(this);
    }
  }
  