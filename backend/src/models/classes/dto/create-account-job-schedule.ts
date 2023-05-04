export class CreateAccountJobScheduleDto {
    private _publicId!: string;
    private _accountJobId!: number;
    private _state!: string;
    private _scheduledAfter!: Date;
    private _scheduledAt!: Date | null;
    private _startedAt!: Date | null;
    private _finishedAt!: Date | null;
    private _errorMessage!: string | null;
 
    constructor(builder: CreateAccountJobScheduleDtoBuilder) {
       this._publicId = builder.publicId;
       this._accountJobId = builder.accountJobId;
       this._state = builder.state;
       this._scheduledAfter = builder.scheduledAfter;
       this._scheduledAt = builder.scheduledAt;
       this._startedAt = builder.startedAt;
       this._finishedAt = builder.finishedAt;
       this._errorMessage = builder.errorMessage;
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
 
    public static get Builder(): CreateAccountJobScheduleDtoBuilder {
       return new CreateAccountJobScheduleDtoBuilder();
    }
 }
 
 class CreateAccountJobScheduleDtoBuilder {
    private _publicId!: string;
    private _accountJobId!: number;
    private _state!: string;
    private _scheduledAfter!: Date;
    private _scheduledAt!: Date | null;
    private _startedAt!: Date | null;
    private _finishedAt!: Date | null;
    private _errorMessage!: string | null;
 
    public withPublicId(publicId: string): CreateAccountJobScheduleDtoBuilder {
       this._publicId = publicId;
       return this;
    }
 
    public withAccountJobId(accountJobId: number): CreateAccountJobScheduleDtoBuilder {
       this._accountJobId = accountJobId;
       return this;
    }
 
    public withState(state: string): CreateAccountJobScheduleDtoBuilder {
       this._state = state;
       return this;
    }
 
    public withScheduledAfter(scheduledAfter: Date): CreateAccountJobScheduleDtoBuilder {
       this._scheduledAfter = scheduledAfter;
       return this;
    }

    public withScheduledAt(scheduledAt: Date | null): CreateAccountJobScheduleDtoBuilder {
      this._scheduledAt = scheduledAt;
      return this;
    }
 
    public withStartedAt(startedAt: Date | null): CreateAccountJobScheduleDtoBuilder {
       this._startedAt = startedAt;
       return this;
    }
 
    public withFinishedAt(finishedAt: Date | null): CreateAccountJobScheduleDtoBuilder {
       this._finishedAt = finishedAt;
       return this;
    }
 
    public withErrorMessage(errorMessage: string | null): CreateAccountJobScheduleDtoBuilder {
       this._errorMessage = errorMessage;
       return this;
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
 
    build(): CreateAccountJobScheduleDto {
       return new CreateAccountJobScheduleDto(this);
    }
 }