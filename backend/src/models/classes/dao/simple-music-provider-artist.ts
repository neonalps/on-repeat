import { SimpleMusicProviderArtistDaoInterface } from "@src/models/dao/simple-music-provider-artist.dao";

export class SimpleMusicProviderArtistDao {
    private _artistId!: number;
    private _musicProviderArtistId!: string;
 
    constructor(builder: SimpleMusicProviderArtistDaoBuilder) {
       this._artistId = builder.artistId;
       this._musicProviderArtistId = builder.musicProviderArtistId;
    }
 
    public get artistId(): number {
       return this._artistId;
    }
 
    public get musicProviderArtistId(): string {
       return this._musicProviderArtistId;
    }
 
    public static get Builder(): SimpleMusicProviderArtistDaoBuilder {
       return new SimpleMusicProviderArtistDaoBuilder();
    }

    public static fromDaoInterface(item: SimpleMusicProviderArtistDaoInterface): SimpleMusicProviderArtistDao {
        return this.Builder
            .withArtistId(item.artistId)
            .withMusicProviderArtistId(item.musicProviderArtistId)
            .build();
    }
 }
 
 class SimpleMusicProviderArtistDaoBuilder {
    private _artistId!: number;
    private _musicProviderArtistId!: string;
 
    public withArtistId(artistId: number): SimpleMusicProviderArtistDaoBuilder {
       this._artistId = artistId;
       return this;
    }
 
    public withMusicProviderArtistId(musicProviderArtistId: string): SimpleMusicProviderArtistDaoBuilder {
       this._musicProviderArtistId = musicProviderArtistId;
       return this;
    }
 
    public get artistId(): number {
       return this._artistId;
    }
 
    public get musicProviderArtistId(): string {
       return this._musicProviderArtistId;
    }
 
    build(): SimpleMusicProviderArtistDao {
       return new SimpleMusicProviderArtistDao(this);
    }
 }