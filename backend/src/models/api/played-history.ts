import { MusicProviderApiDto } from "./music-provider";

export interface PlayedHistoryApiDto {
    playedTrackId: number;
    playedAt: Date;
    musicProvider: MusicProviderApiDto;
    includeInStatistics: boolean;
}