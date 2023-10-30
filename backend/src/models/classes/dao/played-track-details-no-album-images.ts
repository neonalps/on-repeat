import { IdNameDao } from "@src/models/classes/dao/id-name";

export class PlayedTrackDetailsNoAlbumImagesDao {
   private _playedTrackId!: number;
   private _track!: IdNameDao;
   private _album!: IdNameDao | null;
   private _artists!: IdNameDao[];
   private _musicProvider!: IdNameDao;
   private _playedAt!: Date;
   private _includeInStatistics!: boolean;

   constructor(builder: PlayedTrackDetailsNoAlbumImagesDaoBuilder) {
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

   public get album(): IdNameDao | null {
      return this._album;
   }

   public get artists(): IdNameDao[] {
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

   public static get Builder(): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      return new PlayedTrackDetailsNoAlbumImagesDaoBuilder();
   }
}

class PlayedTrackDetailsNoAlbumImagesDaoBuilder {
   private _playedTrackId!: number;
   private _track!: IdNameDao;
   private _album!: IdNameDao | null;
   private _artists!: IdNameDao[];
   private _musicProvider!: IdNameDao;
   private _playedAt!: Date;
   private _includeInStatistics!: boolean;

   public withPlayedTrackId(playedTrackId: number): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      this._playedTrackId = playedTrackId;
      return this;
   }

   public withTrack(track: IdNameDao): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      this._track = track;
      return this;
   }

   public withAlbum(album: IdNameDao | null): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      this._album = album;
      return this;
   }

   public withArtists(artists: IdNameDao[]): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      this._artists = [...artists];
      return this;
   }

   public withMusicProvider(musicProvider: IdNameDao): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      this._musicProvider = musicProvider;
      return this;
   }

   public withPlayedAt(playedAt: Date): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      this._playedAt = playedAt;
      return this;
   }

   public withIncludeInStatistics(includeInStatistics: boolean): PlayedTrackDetailsNoAlbumImagesDaoBuilder {
      this._includeInStatistics = includeInStatistics;
      return this;
   }

   public get playedTrackId(): number {
      return this._playedTrackId;
   }

   public get track(): IdNameDao {
      return this._track;
   }

   public get album(): IdNameDao | null {
      return this._album;
   }

   public get artists(): IdNameDao[] {
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

   build(): PlayedTrackDetailsNoAlbumImagesDao {
      return new PlayedTrackDetailsNoAlbumImagesDao(this);
   }
}