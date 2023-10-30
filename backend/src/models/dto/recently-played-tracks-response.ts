import { SpotifyCursorDto, SpotifyPlayedTrackDto } from "@src/modules/music-provider/spotify/api-types";

export interface SpotifyRecentlyPlayedTracksResponseDto {
    items: SpotifyPlayedTrackDto[],
    next: string;
    cursors: SpotifyCursorDto;
    limit: number;
    href: string;
}