import { AlbumApiDto } from "@src/models/api/album";
import { ArtistApiDto } from "@src/models/api/artist";
import { TrackApiDto } from "@src/models/api/track";

export interface SearchResultItemApiDto {
    type: string;
    item: TrackApiDto | AlbumApiDto | ArtistApiDto;
}