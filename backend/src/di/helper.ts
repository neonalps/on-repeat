import dependencyManager from "./manager";
import { Dependencies } from "./dependencies";
import { TrackMapper } from "@src/modules/track/mapper";
import { TrackService } from "@src/modules/track/service";
import { ArtistMapper } from "@src/modules/artist/mapper";
import { ArtistService } from "@src/modules/artist/service";
import { AlbumMapper } from "@src/modules/album/mapper";
import { AlbumService } from "@src/modules/album/service";
import { CatalogueService } from "@src/modules/catalogue/service";
import { getTokenConfig, getSpotifyClientConfig, getApiConfig } from "@src/config";
import { AccountMapper } from "@src/modules/account/mapper";
import { AccountService } from "@src/modules/account/service";
import { CryptoService } from "@src/modules/crypto/service";
import { AccountTokenMapper } from "@src/modules/account-token/mapper";
import { AccountTokenService } from "@src/modules/account-token/service";
import { AccountJobMapper } from "@src/modules/account-jobs/mapper";
import { AccountJobService } from "@src/modules/account-jobs/service";
import { UuidSource } from "@src/util/uuid";
import { AccountJobScheduleMapper } from "@src/modules/account-jobs-schedules/mapper";
import { AccountJobScheduleService } from "@src/modules/account-jobs-schedules/service";
import { Scheduler } from "@src/modules/scheduler/scheduler";
import { AuthService } from "@src/modules/auth/service";
import { TimeSource } from "@src/util/time";
import { MusicProviderMapper } from "@src/modules/music-provider/mapper";
import { PlayedTrackMapper } from "@src/modules/played-tracks/mapper";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { JobHelper } from "@src/modules/job/helper";
import { JobMapper } from "@src/modules/job/mapper";
import { JobService } from "@src/modules/job/service";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { PaginationService } from "@src/modules/pagination/service";
import { ApiHelper } from "@src/api/helper";
import { ChartService } from "@src/modules/chart/service";
import { SearchService } from "@src/modules/search/search";

export class DependencyHelper {

    private constructor() {}

    public static initDependencies(): void {
        dependencyManager.registerAll(this.getDependencies());
    }

    private static getDependencies(): Map<Dependencies, any> {

        const uuidSource = new UuidSource();
        const timeSource = new TimeSource();

        const apiHelper = new ApiHelper(getApiConfig());

        const cryptoService = new CryptoService();

        const accountMapper = new AccountMapper();
        const accountService = new AccountService(accountMapper, cryptoService, uuidSource);

        const accountJobMapper = new AccountJobMapper();
        const accountJobService = new AccountJobService(accountJobMapper);

        const accountJobScheduleMapper = new AccountJobScheduleMapper();
        const accountJobScheduleService = new AccountJobScheduleService(accountJobScheduleMapper, uuidSource);

        const jobMapper = new JobMapper();
        const jobService = new JobService(jobMapper);

        const jobHelper = new JobHelper(accountService, jobService, accountJobService, accountJobScheduleService, timeSource);

        const accountTokenMapper = new AccountTokenMapper();
        const accountTokenService = new AccountTokenService(accountTokenMapper, cryptoService, timeSource);

        const albumMapper = new AlbumMapper();
        const albumService = new AlbumService(albumMapper);

        const artistMapper = new ArtistMapper();
        const artistService = new ArtistService(artistMapper);
        
        const trackMapper = new TrackMapper();
        const trackService = new TrackService(trackMapper);

        const catalogueService = new CatalogueService(trackService, artistService, albumService);

        const searchService = new SearchService(apiHelper, catalogueService);

        const playedTrackMapper = new PlayedTrackMapper();
        const playedTrackService = new PlayedTrackService(catalogueService, playedTrackMapper);

        const chartService = new ChartService(apiHelper, catalogueService, playedTrackService);

        const spotifyClient = new SpotifyClient(getSpotifyClientConfig());

        const authService = new AuthService(getTokenConfig(), timeSource);

        const musicProviderMapper = new MusicProviderMapper();
        const musicProviderService = new MusicProviderService(musicProviderMapper);

        const spotifyMusicProvider = new SpotifyMusicProvider(accountTokenService, catalogueService, musicProviderService, playedTrackService, spotifyClient, timeSource);

        const scheduler = new Scheduler(jobHelper);

        const paginationService = new PaginationService();

        const dependencies: Map<Dependencies, any> = new Map();
        
        dependencies.set(Dependencies.AccountService, accountService);
        dependencies.set(Dependencies.AccountJobService, accountJobService);
        dependencies.set(Dependencies.AccountJobScheduleService, accountJobScheduleService);
        dependencies.set(Dependencies.AccountTokenService, accountTokenService);
        dependencies.set(Dependencies.ApiHelper, apiHelper);
        dependencies.set(Dependencies.AuthService, authService);
        dependencies.set(Dependencies.CatalogueService, catalogueService);
        dependencies.set(Dependencies.ChartService, chartService);
        dependencies.set(Dependencies.CryptoService, cryptoService);
        dependencies.set(Dependencies.JobHelper, jobHelper);
        dependencies.set(Dependencies.JobService, jobService);
        dependencies.set(Dependencies.MusicProviderService, musicProviderService);
        dependencies.set(Dependencies.PaginationService, paginationService);
        dependencies.set(Dependencies.PlayedTrackService, playedTrackService);
        dependencies.set(Dependencies.Scheduler, scheduler);
        dependencies.set(Dependencies.SearchService, searchService);
        dependencies.set(Dependencies.SpotifyClient, spotifyClient);
        dependencies.set(Dependencies.SpotifyMusicProvider, spotifyMusicProvider);
        dependencies.set(Dependencies.TimeSource, timeSource);
        dependencies.set(Dependencies.UuidSource, uuidSource);

        return dependencies;
    }

}