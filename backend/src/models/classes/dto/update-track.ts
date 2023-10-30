import { TrackDao } from "@src/models/classes/dao/track";

export class UpdateTrackDto {
    private _name!: string;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _trackNumber!: number | null;
    private _durationMs!: number | null;
    private _explicit!: boolean | null;
 
    constructor(builder: UpdateTrackDtoBuilder) {
       this._name = builder.name;
       this._isrc = builder.isrc;
       this._discNumber = builder.discNumber;
       this._trackNumber = builder.trackNumber;
       this._durationMs = builder.durationMs;
       this._explicit = builder.explicit;
    }
 
    public get name(): string {
       return this._name;
    }

    public get isrc(): string | null {
       return this._isrc;
    }
 
    public get discNumber(): number | null {
       return this._discNumber;
    }
 
    public get trackNumber(): number | null {
       return this._trackNumber;
    }
 
    public get durationMs(): number | null {
       return this._durationMs;
    }
 
    public get explicit(): boolean | null {
       return this._explicit;
    }

    public static createFromTrackDao(dao: TrackDao): UpdateTrackDto | null {
        if (!dao) {
            return null;
        }

        return this.Builder
            .withName(dao.name)
            .withIsrc(dao.isrc)
            .withDiscNumber(dao.discNumber)
            .withTrackNumber(dao.trackNumber)
            .withDurationMs(dao.durationMs)
            .withExplicit(dao.explicit)
            .build();
    }
 
    public static get Builder(): UpdateTrackDtoBuilder {
       return new UpdateTrackDtoBuilder();
    }
 }
 
 class UpdateTrackDtoBuilder {
    private _name!: string;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _trackNumber!: number | null;
    private _durationMs!: number | null;
    private _explicit!: boolean | null;
 
    public withName(name: string): UpdateTrackDtoBuilder {
       this._name = name;
       return this;
    }
 
    public withIsrc(isrc: string | null): UpdateTrackDtoBuilder {
       this._isrc = isrc;
       return this;
    }
 
    public withDiscNumber(discNumber: number | null): UpdateTrackDtoBuilder {
       this._discNumber = discNumber;
       return this;
    }
 
    public withTrackNumber(trackNumber: number | null): UpdateTrackDtoBuilder {
       this._trackNumber = trackNumber;
       return this;
    }
 
    public withDurationMs(durationMs: number | null): UpdateTrackDtoBuilder {
       this._durationMs = durationMs;
       return this;
    }
 
    public withExplicit(explicit: boolean | null): UpdateTrackDtoBuilder {
       this._explicit = explicit;
       return this;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get isrc(): string | null {
       return this._isrc;
    }
 
    public get discNumber(): number | null {
       return this._discNumber;
    }
 
    public get trackNumber(): number | null {
       return this._trackNumber;
    }
 
    public get durationMs(): number | null {
       return this._durationMs;
    }
 
    public get explicit(): boolean | null {
       return this._explicit;
    }
 
    build(): UpdateTrackDto {
       return new UpdateTrackDto(this);
    }
 }