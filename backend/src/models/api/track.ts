import { AlbumApiDto } from "@src/models/api/album";
import { ArtistApiDto } from "@src/models/api/artist";

export interface TrackApiDto {
    id: number;
    name: string;
    href: string;
    album: AlbumApiDto | null;
    artists: ArtistApiDto[];
}