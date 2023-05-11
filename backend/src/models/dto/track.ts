import { AlbumDto } from "@src/models/dto/album";
import { ArtistDto } from "@src/models/dto/artist";

export interface TrackDto {
    id: string;
    name: string;
    artists: ArtistDto[];
    album: AlbumDto;
    durationMs: number;
    explicit: boolean;
    href: string;
    discNumber: number;
    trackNumber: number;
    externalIds: Record<string, unknown>;
    externalUrls: Record<string, unknown>;
}