import { PlayedInfoDaoInterface } from "@src/models/dao/played-info.dao";

export class PlayedInfoDao {
    private _firstPlayedAt!: Date | null;
    private _lastPlayedAt!: Date | null;
    private _timesPlayed!: number;
 
    constructor(builder: PlayedInfoDaoBuilder) {
       this._firstPlayedAt = builder.firstPlayedAt;
       this._lastPlayedAt = builder.lastPlayedAt;
       this._timesPlayed = builder.timesPlayed;
    }

    public get firstPlayedAt(): Date | null {
      return this._firstPlayedAt;
    }
 
    public get lastPlayedAt(): Date | null {
       return this._lastPlayedAt;
    }
 
    public get timesPlayed(): number {
       return this._timesPlayed;
    }
 
    public static get Builder(): PlayedInfoDaoBuilder {
       return new PlayedInfoDaoBuilder();
    }

    public static fromDaoInterface(item: PlayedInfoDaoInterface): PlayedInfoDao | null {
        if (!item) {
            return null;
        }

        return this.Builder
            .withFirstPlayedAt(item.firstPlayedAt)
            .withLastPlayedAt(item.lastPlayedAt)
            .withTimesPlayed(item.timesPlayed)
            .build();
    }
 }
 
 class PlayedInfoDaoBuilder {
    private _firstPlayedAt!: Date | null;
    private _lastPlayedAt!: Date | null;
    private _timesPlayed!: number;

    public withFirstPlayedAt(firstPlayedAt: Date | null): PlayedInfoDaoBuilder {
      this._firstPlayedAt = firstPlayedAt;
      return this;
    }
 
    public withLastPlayedAt(lastPlayedAt: Date | null): PlayedInfoDaoBuilder {
       this._lastPlayedAt = lastPlayedAt;
       return this;
    }
 
    public withTimesPlayed(timesPlayed: number): PlayedInfoDaoBuilder {
       this._timesPlayed = timesPlayed;
       return this;
    }

    public get firstPlayedAt(): Date | null {
      return this._firstPlayedAt;
    }
 
    public get lastPlayedAt(): Date | null {
       return this._lastPlayedAt;
    }
 
    public get timesPlayed(): number {
       return this._timesPlayed;
    }
 
    build(): PlayedInfoDao {
       return new PlayedInfoDao(this);
    }
 }