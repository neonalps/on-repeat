import { AccountJobScheduleDaoInterface } from "@src/models/dao/account-job-schedule.dao";

export class AccountJobScheduleDao {
    private _id!: number;
    private _publicId!: string;
    private _accountJobId!: number;
    private _state!: string;
    private _scheduledAfter!: Date;
    private _scheduledAt: Date | null;
    private _startedAt!: Date | null;
    private _finishedAt!: Date | null;
    private _errorMessage!: string | null;
    private _createdAt!: Date;
 
    constructor(builder: AccountJobScheduleDaoBuilder) {
       this._id = builder.id;
       this._publicId = builder.publicId;
       this._accountJobId = builder.accountJobId;
       this._state = builder.state;
       this._scheduledAfter = builder.scheduledAfter;
       this._scheduledAt = builder.scheduledAt;
       this._startedAt = builder.startedAt;
       this._finishedAt = builder.finishedAt;
       this._errorMessage = builder.errorMessage;
       this._createdAt = builder.createdAt;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get publicId(): string {
       return this._publicId;
    }
 
    public get accountJobId(): number {
       return this._accountJobId;
    }
 
    public get state(): string {
       return this._state;
    }
 
    public get scheduledAfter(): Date {
       return this._scheduledAfter;
    }

    public get scheduledAt(): Date | null {
      return this._scheduledAt;
    }
 
    public get startedAt(): Date | null {
       return this._startedAt;
    }
 
    public get finishedAt(): Date | null {
       return this._finishedAt;
    }
 
    public get errorMessage(): string | null {
       return this._errorMessage;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public static get Builder(): AccountJobScheduleDaoBuilder {
       return new AccountJobScheduleDaoBuilder();
    }

    public static fromDaoInterface(item: AccountJobScheduleDaoInterface): AccountJobScheduleDao | null {
      if (!item) {
         return null;
      }

      return this.Builder
         .withId(item.id)
         .withPublicId(item.publicId)
         .withAccountJobId(item.accountJobId)
         .withState(item.state)
         .withScheduledAfter(item.scheduledAfter)
         .withScheduledAt(item.scheduledAt)
         .withStartedAt(item.startedAt)
         .withFinishedAt(item.finishedAt)
         .withErrorMessage(item.errorMessage)
         .withCreatedAt(item.createdAt)
         .build();
    }
 }
 
 class AccountJobScheduleDaoBuilder {
    private _id!: number;
    private _publicId!: string;
    private _accountJobId!: number;
    private _state!: string;
    private _scheduledAfter!: Date;
    private _scheduledAt!: Date | null;
    private _startedAt!: Date | null;
    private _finishedAt!: Date | null;
    private _errorMessage!: string | null;
    private _createdAt!: Date;
 
    public withId(id: number): AccountJobScheduleDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withPublicId(publicId: string): AccountJobScheduleDaoBuilder {
       this._publicId = publicId;
       return this;
    }
 
    public withAccountJobId(accountJobId: number): AccountJobScheduleDaoBuilder {
       this._accountJobId = accountJobId;
       return this;
    }
 
    public withState(state: string): AccountJobScheduleDaoBuilder {
       this._state = state;
       return this;
    }
 
    public withScheduledAfter(scheduledAfter: Date): AccountJobScheduleDaoBuilder {
       this._scheduledAfter = scheduledAfter;
       return this;
    }

    public withScheduledAt(scheduledAt: Date | null): AccountJobScheduleDaoBuilder {
      this._scheduledAt = scheduledAt;
      return this;
   }
 
    public withStartedAt(startedAt: Date | null): AccountJobScheduleDaoBuilder {
       this._startedAt = startedAt;
       return this;
    }
 
    public withFinishedAt(finishedAt: Date | null): AccountJobScheduleDaoBuilder {
       this._finishedAt = finishedAt;
       return this;
    }
 
    public withErrorMessage(errorMessage: string | null): AccountJobScheduleDaoBuilder {
       this._errorMessage = errorMessage;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): AccountJobScheduleDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public get id(): number {
       return this._id;
    }
 
    public get publicId(): string {
       return this._publicId;
    }
 
    public get accountJobId(): number {
       return this._accountJobId;
    }
 
    public get state(): string {
       return this._state;
    }
 
    public get scheduledAfter(): Date {
       return this._scheduledAfter;
    }

    public get scheduledAt(): Date | null {
      return this._scheduledAt;
    }
 
    public get startedAt(): Date | null {
       return this._startedAt;
    }
 
    public get finishedAt(): Date | null {
       return this._finishedAt;
    }
 
    public get errorMessage(): string | null {
       return this._errorMessage;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    build(): AccountJobScheduleDao {
       return new AccountJobScheduleDao(this);
    }
 }
 