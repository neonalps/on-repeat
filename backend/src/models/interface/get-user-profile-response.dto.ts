export interface GetUserProfileResponseDto {
    country: string;
    display_name: string;
    email: string;
    explicit_content: Record<string, boolean | null>;
    external_urls: Record<string, string | null>;
    followers: Record<string, boolean | null>;
    href: string;
    id: string;
    images: Record<string, unknown>[];
    product: string;
    type: string;
    uri: string;
}