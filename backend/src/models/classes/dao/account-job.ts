import { AccountJobDaoInterface } from "@src/models/dao/account-job.dao";

export class AccountJobDao {
    private _id!: number;
    private _accountId!: number;
    private _jobId!: number;
    private _intervalSeconds!: number;
    private _failureCount!: number;
    private _enabled!: boolean;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    constructor(builder: AccountJobDaoBuilder) {
       this._id = builder.id;
       this._accountId = builder.accountId;
       this._jobId = builder.jobId;
       this._intervalSeconds = builder.intervalSeconds;
       this._failureCount = builder.failureCount;
       this._enabled = builder.enabled;
       this._createdAt = builder.createdAt;
       this._updatedAt = builder.updatedAt;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get accountId(): number {
       return this._accountId;
    }
 
    public get jobId(): number {
       return this._jobId;
    }
 
    public get intervalSeconds(): number {
       return this._intervalSeconds;
    }

    public get failureCount(): number {
      return this._failureCount;
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
 
    public static get Builder(): AccountJobDaoBuilder {
       return new AccountJobDaoBuilder();
    }

    public static fromDaoInterface(item: AccountJobDaoInterface): AccountJobDao | null {
        if (!item) {
            return null;
        }

        return AccountJobDao.Builder
            .withId(item.id)
            .withAccountId(item.accountId)
            .withJobId(item.jobId)
            .withIntervalSeconds(item.intervalSeconds)
            .withFailureCount(item.failureCount)
            .withEnabled(item.enabled)
            .withCreatedAt(item.createdAt)
            .withUpdatedAt(item.updatedAt)
            .build();
    }
 }
 
 class AccountJobDaoBuilder {
    private _id!: number;
    private _accountId!: number;
    private _jobId!: number;
    private _intervalSeconds!: number;
    private _failureCount!: number;
    private _enabled!: boolean;
    private _createdAt!: Date;
    private _updatedAt!: Date | null;
 
    public withId(id: number): AccountJobDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withAccountId(accountId: number): AccountJobDaoBuilder {
       this._accountId = accountId;
       return this;
    }
 
    public withJobId(jobId: number): AccountJobDaoBuilder {
       this._jobId = jobId;
       return this;
    }
 
    public withIntervalSeconds(intervalSeconds: number): AccountJobDaoBuilder {
       this._intervalSeconds = intervalSeconds;
       return this;
    }

    public withFailureCount(failureCount: number): AccountJobDaoBuilder {
      this._failureCount = failureCount;
      return this;
   }
 
    public withEnabled(enabled: boolean): AccountJobDaoBuilder {
       this._enabled = enabled;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): AccountJobDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public withUpdatedAt(updatedAt: Date | null): AccountJobDaoBuilder {
       this._updatedAt = updatedAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get accountId(): number {
       return this._accountId;
    }
 
    public get jobId(): number {
       return this._jobId;
    }
 
    public get intervalSeconds(): number {
       return this._intervalSeconds;
    }

    public get failureCount(): number {
      return this._failureCount;
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
 
    build(): AccountJobDao {
       return new AccountJobDao(this);
    }
 }