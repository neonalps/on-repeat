import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";
import { IdNameDao } from "@src/models/classes/dao/id-name";

export class SimpleTrackDetailsDao {
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _artists!: Set<IdNameDao>;

   constructor(builder: SimpleTrackDetailsDaoBuilder) {
      this._track = builder.track;
      this._album = builder.album;
      this._artists = new Set(builder.artists);
   }

   public get track(): IdNameDao {
      return this._track;
   }

   public get album(): SimpleAlbumDao | null {
      return this._album;
   }

   public get artists(): Set<IdNameDao> {
      return new Set(this._artists);
   }

   public static get Builder(): SimpleTrackDetailsDaoBuilder {
      return new SimpleTrackDetailsDaoBuilder();
   }
}

class SimpleTrackDetailsDaoBuilder {
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _artists!: Set<IdNameDao>;

   public withTrack(track: IdNameDao): SimpleTrackDetailsDaoBuilder {
      this._track = track;
      return this;
   }

   public withAlbum(album: SimpleAlbumDao | null): SimpleTrackDetailsDaoBuilder {
      this._album = album;
      return this;
   }

   public withArtists(artists: Set<IdNameDao>): SimpleTrackDetailsDaoBuilder {
      this._artists = new Set(artists);
      return this;
   }

   public get track(): IdNameDao {
      return this._track;
   }

   public get album(): SimpleAlbumDao | null {
      return this._album;
   }

   public get artists(): Set<IdNameDao> {
      return new Set(this._artists);
   }

   build(): SimpleTrackDetailsDao {
      return new SimpleTrackDetailsDao(this);
   }
}