import { PaginationQueryParams } from "@src/modules/pagination/constants";

export interface GetPlayedTrackHistoryPaginatedRequestDto extends PaginationQueryParams {
    trackId: number;
}