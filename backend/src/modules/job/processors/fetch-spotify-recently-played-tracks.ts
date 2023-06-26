import { JobExecutionContext } from "@src/modules/scheduler/scheduler";
import { JobProcessor } from "@src/modules/job/repository";
import { requireNonNull } from "@src/util/common";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";
import { JobHelper } from "@src/modules/job/helper";

export class FetchSpotifyRecentlyPlayedTracksJob implements JobProcessor {

    private readonly spotifyMusicProvider: SpotifyMusicProvider;

    constructor(spotifyMusicProvider: SpotifyMusicProvider) {
        this.spotifyMusicProvider = requireNonNull(spotifyMusicProvider);
    }

    public getJobId(): number {
        return JobHelper.JOB_ID_FETCH_SPOTIFY_RECENT_PLAYED_TRACKS;
    }

    public async process(executionContext: JobExecutionContext): Promise<void> {
        await this.spotifyMusicProvider.fetchAndProcessRecentlyPlayedTracks(executionContext.account.id);
    }

}