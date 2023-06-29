import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";
import { IdNameDao } from "@src/models/classes/dao/id-name";
import { SimpleArtistDao } from "@src/models/classes/dao/artist-simple";

export class PlayedTrackDetailsDao {
   private _playedTrackId!: number;
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _artists!: SimpleArtistDao[];
   private _musicProvider!: IdNameDao;
   private _playedAt!: Date;
   private _includeInStatistics!: boolean;

   constructor(builder: PlayedTrackDetailsDaoBuilder) {
      this._playedTrackId = builder.playedTrackId;
      this._track = builder.track;
      this._album = builder.album;
      this._artists = [...builder.artists];
      this._musicProvider = builder.musicProvider;
      this._playedAt = builder.playedAt;
      this._includeInStatistics = builder.includeInStatistics;
   }

   public get playedTrackId(): number {
      return this._playedTrackId;
   }

   public get track(): IdNameDao {
      return this._track;
   }

   public get album(): SimpleAlbumDao | null {
      return this._album;
   }

   public get artists(): SimpleArtistDao[] {
      return [...this._artists];
   }

   public get musicProvider(): IdNameDao {
      return this._musicProvider;
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
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _artists!: SimpleArtistDao[];
   private _musicProvider!: IdNameDao;
   private _playedAt!: Date;
   private _includeInStatistics!: boolean;

   public withPlayedTrackId(playedTrackId: number): PlayedTrackDetailsDaoBuilder {
      this._playedTrackId = playedTrackId;
      return this;
   }

   public withTrack(track: IdNameDao): PlayedTrackDetailsDaoBuilder {
      this._track = track;
      return this;
   }

   public withAlbum(album: SimpleAlbumDao | null): PlayedTrackDetailsDaoBuilder {
      this._album = album;
      return this;
   }

   public withArtists(artists: SimpleArtistDao[]): PlayedTrackDetailsDaoBuilder {
      this._artists = [...artists];
      return this;
   }

   public withMusicProvider(musicProvider: IdNameDao): PlayedTrackDetailsDaoBuilder {
      this._musicProvider = musicProvider;
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

   public get track(): IdNameDao {
      return this._track;
   }

   public get album(): SimpleAlbumDao | null {
      return this._album;
   }

   public get artists(): SimpleArtistDao[] {
      return [...this._artists];
   }

   public get musicProvider(): IdNameDao {
      return this._musicProvider;
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