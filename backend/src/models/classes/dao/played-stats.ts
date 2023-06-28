export class PlayedStatsDao {
   private _from!: Date | null;
   private _to!: Date | null;
   private _timesPlayed!: number;

   constructor(builder: PlayedStatsDaoBuilder) {
      this._from = builder.from;
      this._to = builder.to;
      this._timesPlayed = builder.timesPlayed;
   }

   public get from(): Date | null {
      return this._from;
   }

   public get to(): Date | null {
      return this._to;
   }

   public get timesPlayed(): number {
      return this._timesPlayed;
   }

   public static get Builder(): PlayedStatsDaoBuilder {
      return new PlayedStatsDaoBuilder();
   }
}

class PlayedStatsDaoBuilder {
   private _from!: Date | null;
   private _to!: Date | null;
   private _timesPlayed!: number;

   public withFrom(from: Date | null): PlayedStatsDaoBuilder {
      this._from = from;
      return this;
   }

   public withTo(to: Date | null): PlayedStatsDaoBuilder {
      this._to = to;
      return this;
   }

   public withTimesPlayed(timesPlayed: number): PlayedStatsDaoBuilder {
      this._timesPlayed = timesPlayed;
      return this;
   }

   public get from(): Date | null {
      return this._from;
   }

   public get to(): Date | null {
      return this._to;
   }

   public get timesPlayed(): number {
      return this._timesPlayed;
   }

   build(): PlayedStatsDao {
      return new PlayedStatsDao(this);
   }
}