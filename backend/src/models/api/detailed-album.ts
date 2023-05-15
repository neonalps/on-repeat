import { PlayedInfoApiDto } from "@src/models/api/played-info";
import { ArtistApiDto } from "@src/models/api/artist";

export interface DetailedAlbumApiDto {
    id: number;
    name: string;
    artists: ArtistApiDto[];
    playedInfo: PlayedInfoApiDto;
    externalUrls: Record<string, string>;
}