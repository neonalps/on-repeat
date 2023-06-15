export class IdNameDao {
    private _id!: number;
    private _name!: string;
 
    constructor(builder: IdNameDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public static get Builder(): IdNameDaoBuilder {
       return new IdNameDaoBuilder();
    }
 }
 
 class IdNameDaoBuilder {
    private _id!: number;
    private _name!: string;
 
    public withId(id: number): IdNameDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): IdNameDaoBuilder {
       this._name = name;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    build(): IdNameDao {
       return new IdNameDao(this);
    }
 }