import { JobExecutionContext } from "@src/modules/scheduler/scheduler";
import { JobProcessor } from "../repository";
import { requireNonNull } from "@src/util/common";
import { AccountTokenService } from "@src/modules/account-token/service";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify-music-provider";

export class FetchSpotifyRecentlyPlayedTracksJob implements JobProcessor {

    static ERROR_NO_ACCOUNT_TOKEN_AVAILABLE = "No account token available";

    private readonly accountTokenService: AccountTokenService;
    private readonly spotifyMusicProvider: SpotifyMusicProvider;

    constructor(accountTokenService: AccountTokenService, spotifyMusicProvider: SpotifyMusicProvider) {
        this.accountTokenService = requireNonNull(accountTokenService);
        this.spotifyMusicProvider = requireNonNull(spotifyMusicProvider);
    }

    public async process(executionContext: JobExecutionContext): Promise<void> {
        console.log(`processing schedule id ${executionContext.accountJobSchedule.id}: fetch recently played Spotify tracks`);

        const accountId = executionContext.account.id;

        // maybe check in mem cache for access token

        const accountToken = await this.accountTokenService.getByAccountIdAndOauthProviderAndScope(accountId, SpotifyMusicProvider.oauthProviderId, SpotifyMusicProvider.oauthScopeRecentlyPlayed);
        if (!accountToken) {
            throw new Error(FetchSpotifyRecentlyPlayedTracksJob.ERROR_NO_ACCOUNT_TOKEN_AVAILABLE);
        }

        await this.spotifyMusicProvider.fetchAndProcessRecentlyPlayedTracks(accountId, accountToken.accessToken);

        // use refresh token to get new access token

        // maybe store access token in in mem cache

        // fetch recently played tracks

        // process recently played tracks
        // until one is found that has already been processed or limit (50) is reached
    }

}