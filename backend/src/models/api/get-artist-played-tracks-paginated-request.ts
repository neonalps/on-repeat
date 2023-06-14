import { PaginationQueryParams } from "@src/modules/pagination/constants";

export interface GetArtistPlayedTracksPaginatedRequestDto extends PaginationQueryParams {
    artistId: number;
    sortBy: string;
}