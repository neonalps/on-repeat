import { PlayedInfoApiDto } from "@src/models/api/played-info";

export interface DetailedArtistApiDto {
    id: number;
    name: string;
    playedInfo: PlayedInfoApiDto;
    externalUrls: Record<string, string>;
}