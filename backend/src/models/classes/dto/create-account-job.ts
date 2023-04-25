export class CreateAccountJobDto {
    private _accountId!: number;
    private _jobId!: number;
    private _intervalSeconds!: number;
    private _enabled!: boolean;
 
    constructor(builder: CreateAccountJobDtoBuilder) {
       this._accountId = builder.accountId;
       this._jobId = builder.jobId;
       this._intervalSeconds = builder.intervalSeconds;
       this._enabled = builder.enabled;
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
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    public static get Builder(): CreateAccountJobDtoBuilder {
       return new CreateAccountJobDtoBuilder();
    }
 }
 
 class CreateAccountJobDtoBuilder {
    private _accountId!: number;
    private _jobId!: number;
    private _intervalSeconds!: number;
    private _enabled!: boolean;
 
    public withAccountId(accountId: number): CreateAccountJobDtoBuilder {
       this._accountId = accountId;
       return this;
    }
 
    public withJobId(jobId: number): CreateAccountJobDtoBuilder {
       this._jobId = jobId;
       return this;
    }
 
    public withIntervalSeconds(intervalSeconds: number): CreateAccountJobDtoBuilder {
       this._intervalSeconds = intervalSeconds;
       return this;
    }
 
    public withEnabled(enabled: boolean): CreateAccountJobDtoBuilder {
       this._enabled = enabled;
       return this;
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
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    build(): CreateAccountJobDto {
       return new CreateAccountJobDto(this);
    }
 }