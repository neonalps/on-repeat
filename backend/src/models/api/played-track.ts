import { TrackApiDto } from "@src/models/api/track";

export interface PlayedTrackApiDto {
    playedAt: Date;
    track: TrackApiDto;
}