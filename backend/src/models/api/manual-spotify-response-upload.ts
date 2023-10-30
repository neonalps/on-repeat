import { SpotifyRecentlyPlayedTracksApiResponseDto } from "@src/modules/music-provider/spotify/api-types";

export interface ManualSpotifyResponseUploadDto {
    response: SpotifyRecentlyPlayedTracksApiResponseDto;
    fetchMissingArtistImages: boolean;
}