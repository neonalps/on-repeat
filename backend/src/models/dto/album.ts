import { ArtistDto } from "@src/models/dto/artist";
import { ImageDto } from "@src/models/dto/image";

export interface AlbumDto {
    id: string;
    name: string;
    albumGroup: string;
    albumType: string;
    artists: ArtistDto[];
    externalUrls: Record<string, string>;
    href: string;
    images: ImageDto[];
    isPlayable: boolean;
    releaseDate: Date | null;
    releaseDatePrecision: string | null;
    totalTracks: number;
    type: string;
    uri: string;
}