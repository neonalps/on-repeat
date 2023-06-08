import { ArtistApiDto } from "./artist";

export interface ChartArtistApiDto {
    position: number;
    delta: number | null;
    artist: ArtistApiDto;
    timesPlayed: number;
}