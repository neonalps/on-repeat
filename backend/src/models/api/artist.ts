import { ImageApiDto } from "@src/models/api/image";

export interface ArtistApiDto {
    id: number;
    name: string;
    href: string;
    images: ImageApiDto[];
}