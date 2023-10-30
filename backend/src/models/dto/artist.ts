export interface ArtistDto {
    id: string;
    name: string;
    type: string;
    uri: string;
    href: string;
    externalUrls: Record<string, string>;
}