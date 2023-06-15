import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";
import { IdNameDao } from "@src/models/classes/dao/id-name";

export class ArtistPlayedTrackDetailsDao {
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _additionalArtists!: Set<IdNameDao>;
   private _timesPlayed!: number;

   constructor(builder: ArtistPlayedTrackDetailsDaoBuilder) {
      this._track = builder.track;
      this._album = builder.album;
      this._additionalArtists = new Set(builder.additionalArtists);
      this._timesPlayed = builder.timesPlayed;
   }

   public get track(): IdNameDao {
      return this._track;
   }

   public get album(): SimpleAlbumDao | null {
      return this._album;
   }

   public get additionalArtists(): Set<IdNameDao> {
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
   private _track!: IdNameDao;
   private _album!: SimpleAlbumDao | null;
   private _additionalArtists!: Set<IdNameDao>;
   private _timesPlayed!: number;

   public withTrack(track: IdNameDao): ArtistPlayedTrackDetailsDaoBuilder {
      this._track = track;
      return this;
   }

   public withAlbum(album: SimpleAlbumDao | null): ArtistPlayedTrackDetailsDaoBuilder {
      this._album = album;
      return this;
   }

   public withAdditionalArtists(additionalArtists: Set<IdNameDao>): ArtistPlayedTrackDetailsDaoBuilder {
      this._additionalArtists = new Set(additionalArtists);
      return this;
   }

   public withTimesPlayed(timesPlayed: number): ArtistPlayedTrackDetailsDaoBuilder {
      this._timesPlayed = timesPlayed;
      return this;
   }

   public get track(): IdNameDao {
      return this._track;
   }

   public get album(): SimpleAlbumDao | null {
      return this._album;
   }

   public get additionalArtists(): Set<IdNameDao> {
      return new Set(this._additionalArtists);
   }

   public get timesPlayed(): number {
      return this._timesPlayed;
   }

   build(): ArtistPlayedTrackDetailsDao {
      return new ArtistPlayedTrackDetailsDao(this);
   }
}