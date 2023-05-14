export class SimpleArtistDao {
    private _id!: number;
    private _name!: string;
 
    constructor(builder: SimpleArtistDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public static get Builder(): SimpleArtistDaoBuilder {
       return new SimpleArtistDaoBuilder();
    }
 }
 
 class SimpleArtistDaoBuilder {
    private _id!: number;
    private _name!: string;
 
    public withId(id: number): SimpleArtistDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): SimpleArtistDaoBuilder {
       this._name = name;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    build(): SimpleArtistDao {
       return new SimpleArtistDao(this);
    }
 }