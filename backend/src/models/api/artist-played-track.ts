import { AlbumApiDto } from "./album";
import { ArtistApiDto } from "./artist";
import { PlayedInfoApiDto } from "./played-info";

export interface ArtistPlayedTrackApiDto {
    id: number;
    name: string;
    href: string;
    album: AlbumApiDto | null;
    artists: ArtistApiDto[];
    playedInfo: PlayedInfoApiDto;
}