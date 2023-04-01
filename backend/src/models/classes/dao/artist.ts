class ArtistDao {
    private _id: number;
    private _name: string;
    private _createdAt: Date;
  
    constructor(builder: ArtistDaoBuilder) {
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
  
    public static get Builder(): ArtistDaoBuilder {
      return new ArtistDaoBuilder();
    }

    public static fromDaoInterface(daoInterface: ArtistDaoInterface): ArtistDao {
        return this.Builder
            .withId(daoInterface.id)
            .withName(daoInterface.name)
            .withCreatedAt(daoInterface.createdAt)
            .build();
    }
  }
  
  class ArtistDaoBuilder {
    private _id!: number;
    private _name!: string;
    private _createdAt!: Date;
  
    public withId(id: number): ArtistDaoBuilder {
      this._id = id;
      return this;
    }
  
    public withName(name: string): ArtistDaoBuilder {
      this._name = name;
      return this;
    }
  
    public withCreatedAt(createdAt: Date): ArtistDaoBuilder {
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
  
    public build(): ArtistDao {
      return new ArtistDao(this);
    }
  }
  