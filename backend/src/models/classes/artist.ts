class Artist {
    private _id: number;
    private _name: string;
    private _createdAt: Date;
  
    constructor(builder: ArtistBuilder) {
      this._id = builder.id;
      this._name = builder.name;
      this._createdAt = builder.createdAt;
    }
  
    public get id(): number {
      return this._id;
    }
  
    public get name(): string {
      return this._name;
    }
  
    public get createdAt(): Date {
      return this._createdAt;
    }
  
    public static get Builder(): ArtistBuilder {
      return new ArtistBuilder();
    }

    public static fromDao(dao: ArtistDao): Artist {
      return this.Builder
          .withId(dao.id)
          .withName(dao.name)
          .withCreatedAt(dao.createdAt)
          .build();
  }
  }
  
  class ArtistBuilder {
    private _id!: number;
    private _name!: string;
    private _createdAt!: Date;
  
    public withId(id: number): ArtistBuilder {
      this._id = id;
      return this;
    }
  
    public withName(name: string): ArtistBuilder {
      this._name = name;
      return this;
    }
  
    public withCreatedAt(createdAt: Date): ArtistBuilder {
      this._createdAt = createdAt;
      return this;
    }
  
    public get id(): number {
      return this.id;
    }
  
    public get name(): string {
      return this._name;
    }
  
    public get createdAt(): Date {
      return this._createdAt;
    }
  
    public build(): Artist {
      return new Artist(this);
    }
  }
  