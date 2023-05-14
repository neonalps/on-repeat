import { SimpleArtistDao } from "@src/models/classes/dao/artist-simple";

export class PlayedTrackDetailsDao {
   private _playedTrackId!: number;
   private _trackId!: number;
   private _trackName!: string;
   private _albumId!: number;
   private _albumName!: string;
   private _artists!: Set<SimpleArtistDao>;
   private _musicProviderId!: number;
   private _musicProviderName!: string;
   private _playedAt!: Date;
   private _includeInStatistics!: boolean;

   constructor(builder: PlayedTrackDetailsDaoBuilder) {
      this._playedTrackId = builder.playedTrackId;
      this._trackId = builder.trackId;
      this._trackName = builder.trackName;
      this._albumId = builder.albumId;
      this._albumName = builder.albumName;
      this._artists = new Set(builder.artists);
      this._musicProviderId = builder.musicProviderId;
      this._musicProviderName = builder.musicProviderName;
      this._playedAt = builder.playedAt;
      this._includeInStatistics = builder.includeInStatistics;
   }

   public get playedTrackId(): number {
      return this._playedTrackId;
   }

   public get trackId(): number {
      return this._trackId;
   }

   public get trackName(): string {
      return this._trackName;
   }

   public get albumId(): number {
      return this._albumId;
   }

   public get albumName(): string {
      return this._albumName;
   }

   public get artists(): Set<SimpleArtistDao> {
      return new Set(this._artists);
   }

   public get musicProviderId(): number {
      return this._musicProviderId;
   }

   public get musicProviderName(): string {
      return this._musicProviderName;
   }

   public get playedAt(): Date {
      return this._playedAt;
   }

   public get includeInStatistics(): boolean {
      return this._includeInStatistics;
   }

   public static get Builder(): PlayedTrackDetailsDaoBuilder {
      return new PlayedTrackDetailsDaoBuilder();
   }
}

class PlayedTrackDetailsDaoBuilder {
   private _playedTrackId!: number;
   private _trackId!: number;
   private _trackName!: string;
   private _albumId!: number;
   private _albumName!: string;
   private _artists!: Set<SimpleArtistDao>;
   private _musicProviderId!: number;
   private _musicProviderName!: string;
   private _playedAt!: Date;
   private _includeInStatistics!: boolean;

   public withPlayedTrackId(playedTrackId: number): PlayedTrackDetailsDaoBuilder {
      this._playedTrackId = playedTrackId;
      return this;
   }

   public withTrackId(trackId: number): PlayedTrackDetailsDaoBuilder {
      this._trackId = trackId;
      return this;
   }

   public withTrackName(trackName: string): PlayedTrackDetailsDaoBuilder {
      this._trackName = trackName;
      return this;
   }

   public withAlbumId(albumId: number): PlayedTrackDetailsDaoBuilder {
      this._albumId = albumId;
      return this;
   }

   public withAlbumName(albumName: string): PlayedTrackDetailsDaoBuilder {
      this._albumName = albumName;
      return this;
   }

   public withArtists(artists: Set<SimpleArtistDao>): PlayedTrackDetailsDaoBuilder {
      this._artists = new Set(artists);
      return this;
   }

   public withMusicProviderId(musicProviderId: number): PlayedTrackDetailsDaoBuilder {
      this._musicProviderId = musicProviderId;
      return this;
   }

   public withMusicProviderName(musicProviderName: string): PlayedTrackDetailsDaoBuilder {
      this._musicProviderName = musicProviderName;
      return this;
   }

   public withPlayedAt(playedAt: Date): PlayedTrackDetailsDaoBuilder {
      this._playedAt = playedAt;
      return this;
   }

   public withIncludeInStatistics(includeInStatistics: boolean): PlayedTrackDetailsDaoBuilder {
      this._includeInStatistics = includeInStatistics;
      return this;
   }

   public get playedTrackId(): number {
      return this._playedTrackId;
   }

   public get trackId(): number {
      return this._trackId;
   }

   public get trackName(): string {
      return this._trackName;
   }

   public get albumId(): number {
      return this._albumId;
   }

   public get albumName(): string {
      return this._albumName;
   }

   public get artists(): Set<SimpleArtistDao> {
      return new Set(this._artists);
   }

   public get musicProviderId(): number {
      return this._musicProviderId;
   }

   public get musicProviderName(): string {
      return this._musicProviderName;
   }

   public get playedAt(): Date {
      return this._playedAt;
   }

   public get includeInStatistics(): boolean {
      return this._includeInStatistics;
   }

   build(): PlayedTrackDetailsDao {
      return new PlayedTrackDetailsDao(this);
   }
}