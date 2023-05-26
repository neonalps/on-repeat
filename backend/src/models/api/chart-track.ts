import { TrackApiDto } from "./track";

export interface ChartTrackApiDto {
    position: number;
    delta: number | null;
    track: TrackApiDto;
    timesPlayed: number;
}