import { PaginationQueryParams } from "@src/modules/pagination/constants";

export interface GetAccountJobSchedulesPaginatedRequestDto extends PaginationQueryParams {
    state?: string;
}