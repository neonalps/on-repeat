import { ImageApiDto } from "@src/models/api/image";

export interface AlbumApiDto {
    id: number;
    name: string;
    href: string;
    images: ImageApiDto[];
}