import { SimpleArtistDao } from "@src/models/classes/dao/artist-simple";

export class ArtistPlayedTrackDetailsDao {
    private _trackId!: number;
    private _trackName!: string;
    private _albumId!: number | null;
    private _albumName!: string | null;
    private _additionalArtists!: Set<SimpleArtistDao>;
    private _timesPlayed!: number;
 
    constructor(builder: ArtistPlayedTrackDetailsDaoBuilder) {
       this._trackId = builder.trackId;
       this._trackName = builder.trackName;
       this._albumId = builder.albumId;
       this._albumName = builder.albumName;
       this._additionalArtists = new Set(builder.additionalArtists);
       this._timesPlayed = builder.timesPlayed;
    }
 
    public get trackId(): number {
       return this._trackId;
    }
 
    public get trackName(): string {
       return this._trackName;
    }
 
    public get albumId(): number | null {
       return this._albumId;
    }
 
    public get albumName(): string | null {
       return this._albumName;
    }
 
    public get additionalArtists(): Set<SimpleArtistDao> {
       return new Set(this._additionalArtists);
    }
 
    public get timesPlayed(): number {
       return this._timesPlayed;
    }
 
    public static get Builder(): ArtistPlayedTrackDetailsDaoBuilder {
       return new ArtistPlayedTrackDetailsDaoBuilder();
    }
 }
 
 class ArtistPlayedTrackDetailsDaoBuilder {
    private _trackId!: number;
    private _trackName!: string;
    private _albumId!: number | null;
    private _albumName!: string | null;
    private _additionalArtists!: Set<SimpleArtistDao>;
    private _timesPlayed!: number;
 
    public withTrackId(trackId: number): ArtistPlayedTrackDetailsDaoBuilder {
       this._trackId = trackId;
       return this;
    }
 
    public withTrackName(trackName: string): ArtistPlayedTrackDetailsDaoBuilder {
       this._trackName = trackName;
       return this;
    }
 
    public withAlbumId(albumId: number | null): ArtistPlayedTrackDetailsDaoBuilder {
       this._albumId = albumId;
       return this;
    }
 
    public withAlbumName(albumName: string | null): ArtistPlayedTrackDetailsDaoBuilder {
       this._albumName = albumName;
       return this;
    }
 
    public withAdditionalArtists(additionalArtists: Set<SimpleArtistDao>): ArtistPlayedTrackDetailsDaoBuilder {
       this._additionalArtists = new Set(additionalArtists);
       return this;
    }
 
    public withTimesPlayed(timesPlayed: number): ArtistPlayedTrackDetailsDaoBuilder {
       this._timesPlayed = timesPlayed;
       return this;
    }
 
    public get trackId(): number {
       return this._trackId;
    }
 
    public get trackName(): string {
       return this._trackName;
    }
 
    public get albumId(): number | null {
       return this._albumId;
    }
 
    public get albumName(): string | null {
       return this._albumName;
    }
 
    public get additionalArtists(): Set<SimpleArtistDao> {
       return new Set(this._additionalArtists);
    }
 
    public get timesPlayed(): number {
       return this._timesPlayed;
    }
 
    build(): ArtistPlayedTrackDetailsDao {
       return new ArtistPlayedTrackDetailsDao(this);
    }
 }