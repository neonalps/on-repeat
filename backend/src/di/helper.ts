import dependencyManager from "./manager";
import { Dependencies } from "./dependencies";
import { TrackMapper } from "@src/catalogue/track/mapper";
import { TrackService } from "@src/catalogue/track/service";
import { ArtistMapper } from "@src/catalogue/artist/mapper";
import { ArtistService } from "@src/catalogue/artist/service";
import { AlbumMapper } from "@src/catalogue/album/mapper";
import { AlbumService } from "@src/catalogue/album/service";
import { CatalogueService } from "@src/catalogue/service";
import { SpotifyClient } from "@src/oauth/spotify";
import { getTokenConfig, getSpotifyClientConfig } from "@src/config";
import { AccountMapper } from "@src/account/mapper";
import { AccountService } from "@src/account/service";
import { CryptoService } from "@src/crypto/service";
import { AccountTokenMapper } from "@src/account-token/mapper";
import { AccountTokenService } from "@src/account-token/service";
import { AccountJobMapper } from "@src/account-jobs/mapper";
import { AccountJobService } from "@src/account-jobs/service";
import { UuidSource } from "@src/util/uuid";
import { AccountJobScheduleMapper } from "@src/account-jobs-schedules/mapper";
import { AccountJobScheduleService } from "@src/account-jobs-schedules/service";
import { Scheduler } from "@src/scheduler/scheduler";
import { AuthService } from "@src/auth/service";
import { TimeSource } from "@src/util/time";
import { MusicProviderMapper } from "@src/music-provider/music-provider-mapper";
import { SpotifyMusicProvider } from "@src/music-provider/spotify-music-provider";
import { PlayedTrackMapper } from "@src/played-tracks/mapper";
import { PlayedTrackService } from "@src/played-tracks/service";

export class DependencyHelper {

    constructor() {}

    public static initDependencies(): void {
        dependencyManager.registerAll(this.getDependencies());
    }

    private static getDependencies(): Map<Dependencies, any> {

        const uuidSource = new UuidSource();
        const timeSource = new TimeSource();

        const cryptoService = new CryptoService();

        const accountMapper = new AccountMapper();
        const accountService = new AccountService(accountMapper, cryptoService);

        const accountJobMapper = new AccountJobMapper();
        const accountJobService = new AccountJobService(accountJobMapper);

        const accountJobScheduleMapper = new AccountJobScheduleMapper();
        const accountJobScheduleService = new AccountJobScheduleService(accountJobScheduleMapper, uuidSource);

        const accountTokenMapper = new AccountTokenMapper();
        const accountTokenService = new AccountTokenService(accountTokenMapper, cryptoService);

        const albumMapper = new AlbumMapper();
        const albumService = new AlbumService(albumMapper);

        const artistMapper = new ArtistMapper();
        const artistService = new ArtistService(artistMapper);
        
        const trackMapper = new TrackMapper();
        const trackService = new TrackService(trackMapper);

        const catalogueService = new CatalogueService(trackService, artistService, albumService);

        const playedTrackMapper = new PlayedTrackMapper();
        const playedTrackService = new PlayedTrackService(playedTrackMapper);

        const spotifyClient = new SpotifyClient(getSpotifyClientConfig());

        const authService = new AuthService(getTokenConfig(), timeSource);

        const musicProviderMapper = new MusicProviderMapper();

        const spotifyMusicProvider = new SpotifyMusicProvider(musicProviderMapper, catalogueService);

        const scheduler = new Scheduler();

        const dependencies: Map<Dependencies, any> = new Map();
        
        dependencies.set(Dependencies.AccountService, accountService);
        dependencies.set(Dependencies.AccountJobService, accountJobService);
        dependencies.set(Dependencies.AccountJobScheduleService, accountJobScheduleService);
        dependencies.set(Dependencies.AccountTokenService, accountTokenService);
        dependencies.set(Dependencies.AlbumService, albumService);
        dependencies.set(Dependencies.ArtistService, artistService);
        dependencies.set(Dependencies.AuthService, authService);
        dependencies.set(Dependencies.CatalogueService, catalogueService);
        dependencies.set(Dependencies.CryptoService, cryptoService);
        dependencies.set(Dependencies.PlayedTrackService, playedTrackService);
        dependencies.set(Dependencies.Scheduler, scheduler);
        dependencies.set(Dependencies.SpotifyClient, spotifyClient);
        dependencies.set(Dependencies.SpotifyMusicProvider, spotifyMusicProvider);
        dependencies.set(Dependencies.TrackService, trackService);
        dependencies.set(Dependencies.UuidSource, uuidSource);

        return dependencies;
    }

}