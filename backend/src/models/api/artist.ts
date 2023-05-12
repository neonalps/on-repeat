import { PlayedInfoApiDto } from "@src/models/api/played-info";

export interface ArtistApiDto {
    id: number;
    name: string;
    playedInfo: PlayedInfoApiDto;
    externalUrls: Record<string, string>;
}