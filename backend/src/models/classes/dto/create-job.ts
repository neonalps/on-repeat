export class CreateJobDto {
    private _name!: string;
    private _enabled!: boolean;
 
    constructor(builder: CreateJobDtoBuilder) {
       this._name = builder.name;
       this._enabled = builder.enabled;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    public static get Builder(): CreateJobDtoBuilder {
       return new CreateJobDtoBuilder();
    }
 }
 
 class CreateJobDtoBuilder {
    private _name!: string;
    private _enabled!: boolean;
 
    public withName(name: string): CreateJobDtoBuilder {
       this._name = name;
       return this;
    }
 
    public withEnabled(enabled: boolean): CreateJobDtoBuilder {
       this._enabled = enabled;
       return this;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get enabled(): boolean {
       return this._enabled;
    }
 
    build(): CreateJobDto {
       return new CreateJobDto(this);
    }
 }