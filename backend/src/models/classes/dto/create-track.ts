import { TrackDao } from "@src/models/classes/dao/track";

export class CreateTrackDto {
    private _name!: string;
    private _artistIds!: number[];
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _trackNumber!: number | null;
    private _durationMs!: number | null;
    private _explicit!: boolean | null;
 
    constructor(builder: CreateTrackDtoBuilder) {
       this._name = builder.name;
       this._artistIds = [...builder.artistIds];
       this._albumId = builder.albumId;
       this._isrc = builder.isrc;
       this._discNumber = builder.discNumber;
       this._trackNumber = builder.trackNumber;
       this._durationMs = builder.durationMs;
       this._explicit = builder.explicit;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get artistIds(): number[] {
       return [...this._artistIds];
    }
 
    public get albumId(): number | null {
       return this._albumId;
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

    public static createFromTrackDao(dao: TrackDao): CreateTrackDto | null {
        if (!dao) {
            return null;
        }

        return this.Builder
            .withName(dao.name)
            .withArtistIds(dao.artistIds)
            .withAlbumId(dao.albumId)
            .withIsrc(dao.isrc)
            .withDiscNumber(dao.discNumber)
            .withTrackNumber(dao.trackNumber)
            .withDurationMs(dao.durationMs)
            .withExplicit(dao.explicit)
            .build();
    }
 
    public static get Builder(): CreateTrackDtoBuilder {
       return new CreateTrackDtoBuilder();
    }
 }
 
 class CreateTrackDtoBuilder {
    private _name!: string;
    private _artistIds!: number[];
    private _albumId!: number | null;
    private _isrc!: string | null;
    private _discNumber!: number | null;
    private _trackNumber!: number | null;
    private _durationMs!: number | null;
    private _explicit!: boolean | null;
 
    public withName(name: string): CreateTrackDtoBuilder {
       this._name = name;
       return this;
    }
 
    public withArtistIds(artistIds: number[]): CreateTrackDtoBuilder {
       this._artistIds = [...artistIds];
       return this;
    }
 
    public withAlbumId(albumId: number | null): CreateTrackDtoBuilder {
       this._albumId = albumId;
       return this;
    }
 
    public withIsrc(isrc: string | null): CreateTrackDtoBuilder {
       this._isrc = isrc;
       return this;
    }
 
    public withDiscNumber(discNumber: number | null): CreateTrackDtoBuilder {
       this._discNumber = discNumber;
       return this;
    }
 
    public withTrackNumber(trackNumber: number | null): CreateTrackDtoBuilder {
       this._trackNumber = trackNumber;
       return this;
    }
 
    public withDurationMs(durationMs: number | null): CreateTrackDtoBuilder {
       this._durationMs = durationMs;
       return this;
    }
 
    public withExplicit(explicit: boolean | null): CreateTrackDtoBuilder {
       this._explicit = explicit;
       return this;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get artistIds(): number[] {
       return [...this._artistIds];
    }
 
    public get albumId(): number | null {
       return this._albumId;
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
 
    build(): CreateTrackDto {
       return new CreateTrackDto(this);
    }
 }