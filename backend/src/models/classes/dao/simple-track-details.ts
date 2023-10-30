import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";
import { IdNameDao } from "@src/models/classes/dao/id-name";
import { SimpleArtistDao } from "@src/models/classes/dao/artist-simple";

export class SimpleTrackDetailsDao {
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _artists!: SimpleArtistDao[];

   constructor(builder: SimpleTrackDetailsDaoBuilder) {
      this._track = builder.track;
      this._album = builder.album;
      this._artists = [...builder.artists];
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

   public static get Builder(): SimpleTrackDetailsDaoBuilder {
      return new SimpleTrackDetailsDaoBuilder();
   }
}

class SimpleTrackDetailsDaoBuilder {
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _artists!: SimpleArtistDao[];

   public withTrack(track: IdNameDao): SimpleTrackDetailsDaoBuilder {
      this._track = track;
      return this;
   }

   public withAlbum(album: SimpleAlbumDao | null): SimpleTrackDetailsDaoBuilder {
      this._album = album;
      return this;
   }

   public withArtists(artists: SimpleArtistDao[]): SimpleTrackDetailsDaoBuilder {
      this._artists = [...artists];
      return this;
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

   build(): SimpleTrackDetailsDao {
      return new SimpleTrackDetailsDao(this);
   }
}