import { JobExecutionContext } from "@src/modules/scheduler/scheduler";
import { JobProcessor } from "../repository";
import { requireNonNull } from "@src/util/common";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";

export class FetchSpotifyRecentlyPlayedTracksJob implements JobProcessor {

    static ERROR_NO_ACCOUNT_TOKEN_AVAILABLE = "No account token available";

    private readonly spotifyMusicProvider: SpotifyMusicProvider;

    constructor(spotifyMusicProvider: SpotifyMusicProvider) {
        this.spotifyMusicProvider = requireNonNull(spotifyMusicProvider);
    }

    public async process(executionContext: JobExecutionContext): Promise<void> {
        await this.spotifyMusicProvider.fetchAndProcessRecentlyPlayedTracks(executionContext.account.id);
    }

}