import { AlbumApiDto } from "./album";
import { ArtistApiDto } from "./artist";

export interface ArtistPlayedTrackApiDto {
    id: number;
    name: string;
    href: string;
    album: AlbumApiDto | null;
    additionalArtists: ArtistApiDto[];
    timesPlayed: number;
}