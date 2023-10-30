import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { ManualSpotifyResponseUploadDto } from "@src/models/api/manual-spotify-response-upload";
import { SpotifyApiResponseConverter } from "@src/modules/music-provider/spotify/api-response-converter";

export class ManualSpotifyResponseUploadHandler implements RouteHandler<ManualSpotifyResponseUploadDto, void> {

    private readonly musicProvider: SpotifyMusicProvider;

    constructor(musicProvider: SpotifyMusicProvider) {
        this.musicProvider = requireNonNull(musicProvider);
    }

    public async handle(context: AuthenticationContext, dto: ManualSpotifyResponseUploadDto): Promise<void> {
        if (context.account === null) {
            throw new Error("Illegal state");
        }

        const accountId = context.account.id;
        const convertedResponse = SpotifyApiResponseConverter.convertRecentlyPlayedTracksApiResponse(dto.response);

        await this.musicProvider.processPlayedTracks(accountId, convertedResponse.items);

        if (dto.fetchMissingArtistImages === true) {
            const artistIds = this.musicProvider.findSpotifyArtistIds(convertedResponse.items);
            await this.musicProvider.fetchAndProcessMissingArtistImages(accountId, artistIds);
        }
    }
    
}