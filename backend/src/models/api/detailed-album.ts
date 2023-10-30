import { PlayedInfoApiDto } from "@src/models/api/played-info";
import { ArtistApiDto } from "@src/models/api/artist";
import { ImageApiDto } from "@src/models/api/image";

export interface DetailedAlbumApiDto {
    id: number;
    name: string;
    artists: ArtistApiDto[];
    playedInfo: PlayedInfoApiDto;
    externalUrls: Record<string, string>;
    totalTracks: number | null;
    releaseDate: Date | null;
    releaseDatePrecision: string | null;
    images: ImageApiDto[];
}