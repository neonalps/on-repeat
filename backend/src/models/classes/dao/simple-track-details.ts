import { SimpleArtistDao } from "@src/models/classes/dao/artist-simple";

export class SimpleTrackDetailsDao {
    private _trackId!: number;
    private _trackName!: string;
    private _albumId!: number | null;
    private _albumName!: string | null;
    private _artists!: Set<SimpleArtistDao>;
 
    constructor(builder: SimpleTrackDetailsDaoBuilder) {
       this._trackId = builder.trackId;
       this._trackName = builder.trackName;
       this._albumId = builder.albumId;
       this._albumName = builder.albumName;
       this._artists = new Set(builder.artists);
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
 
    public get artists(): Set<SimpleArtistDao> {
       return new Set(this._artists);
    }
 
    public static get Builder(): SimpleTrackDetailsDaoBuilder {
       return new SimpleTrackDetailsDaoBuilder();
    }
 }
 
 class SimpleTrackDetailsDaoBuilder {
    private _trackId!: number;
    private _trackName!: string;
    private _albumId!: number | null;
    private _albumName!: string | null;
    private _artists!: Set<SimpleArtistDao>;
 
    public withTrackId(trackId: number): SimpleTrackDetailsDaoBuilder {
       this._trackId = trackId;
       return this;
    }
 
    public withTrackName(trackName: string): SimpleTrackDetailsDaoBuilder {
       this._trackName = trackName;
       return this;
    }
 
    public withAlbumId(albumId: number | null): SimpleTrackDetailsDaoBuilder {
       this._albumId = albumId;
       return this;
    }
 
    public withAlbumName(albumName: string | null): SimpleTrackDetailsDaoBuilder {
       this._albumName = albumName;
       return this;
    }
 
    public withArtists(artists: Set<SimpleArtistDao>): SimpleTrackDetailsDaoBuilder {
       this._artists = new Set(artists);
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
 
    public get artists(): Set<SimpleArtistDao> {
       return new Set(this._artists);
    }
 
    build(): SimpleTrackDetailsDao {
       return new SimpleTrackDetailsDao(this);
    }
 }