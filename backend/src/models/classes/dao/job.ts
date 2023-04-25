import { JobDaoInterface } from "@src/models/dao/job.dao";

export class JobDao {
    private _id!: number;
    private _name!: string;
    private _enabled!: boolean;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    constructor(builder: JobDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
       this._enabled = builder.enabled;
       this._createdAt = builder.createdAt;
       this._updatedAt = builder.updatedAt;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    public static get Builder(): JobDaoBuilder {
       return new JobDaoBuilder();
    }

    public static fromDaoInterface(item: JobDaoInterface): JobDao | null {
        if (!item) {
            return null;
        }

        return JobDao.Builder
            .withId(item.id)
            .withName(item.name)
            .withEnabled(item.enabled)
            .withCreatedAt(item.createdAt)
            .withUpdatedAt(item.updatedAt)
            .build();
    }
 }
 
 class JobDaoBuilder {
    private _id!: number;
    private _name!: string;
    private _enabled!: boolean;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    public withId(id: number): JobDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): JobDaoBuilder {
       this._name = name;
       return this;
    }
 
    public withEnabled(enabled: boolean): JobDaoBuilder {
       this._enabled = enabled;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): JobDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public withUpdatedAt(updatedAt: Date | null): JobDaoBuilder {
       this._updatedAt = updatedAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get updatedAt(): Date | null {
       return this._updatedAt;
    }
 
    build(): JobDao {
       return new JobDao(this);
    }
 }