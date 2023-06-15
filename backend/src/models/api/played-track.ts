import { TrackApiDto } from "@src/models/api/track";
import { MusicProviderApiDto } from "@src/models/api/music-provider";

export interface PlayedTrackApiDto {
    playedTrackId: number;
    playedAt: Date;
    track: TrackApiDto;
    musicProvider: MusicProviderApiDto;
    includeInStatistics: boolean;
}