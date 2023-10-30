import { PlayedInfoApiDto } from "@src/models/api/played-info";
import { ArtistApiDto } from "@src/models/api/artist";
import { AlbumApiDto } from "@src/models/api/album";

export interface DetailedTrackApiDto {
    id: number;
    name: string;
    artists: ArtistApiDto[];
    album: AlbumApiDto | null;
    playedInfo: PlayedInfoApiDto;
    externalUrls: Record<string, string>;
    explicit: boolean | null;
    isrc: string | null;
    discNumber: number | null;
    trackNumber: number | null;
    durationMs: number | null;
}