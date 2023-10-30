import { PlayedInfoApiDto } from "@src/models/api/played-info";
import { ImageApiDto } from "@src/models/api/image";

export interface DetailedArtistApiDto {
    id: number;
    name: string;
    playedInfo: PlayedInfoApiDto;
    externalUrls: Record<string, string>;
    images: ImageApiDto[];
}