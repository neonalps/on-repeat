import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { isDefined, removeNull, requireNonNull } from "@src/util/common";
import { AccountDao } from "@src/models/classes/dao/account";
import { GetAllAccountTokensRequestDto } from "@src/models/api/get-all-account-tokens-request";
import { PaginatedResponseDto } from "@src/models/api/paginated-response";
import { ApiHelper } from "@src/api/helper";
import { PaginationService } from "@src/modules/pagination/service";
import { AccountJobScheduleService, GetAccountJobSchedulesPaginationParams } from "@src/modules/account-jobs-schedules/service";
import { MAX_NUMBER, MIN_NUMBER, SortOrder } from "@src/modules/pagination/constants";
import { JobStatus, parseJobStatus } from "@src/models/enum/job-status";
import { GetAccountJobSchedulesPaginatedRequestDto } from "@src/models/api/get-account-job-schedules-paginated-request";
import { AccountJobScheduleApiDto } from "@src/models/api/account-job-schedule";
import { AccountJobScheduleDao } from "@src/models/classes/dao/account-job-schedule";

export class GetAllAccountJobSchedulesPaginatedHandler implements RouteHandler<GetAccountJobSchedulesPaginatedRequestDto, PaginatedResponseDto<AccountJobScheduleApiDto>> {

    private readonly accountJobScheduleService: AccountJobScheduleService;
    private readonly apiHelper: ApiHelper;
    private readonly paginationService: PaginationService;
    
    constructor(accountJobScheduleService: AccountJobScheduleService, apiHelper: ApiHelper, paginationService: PaginationService) {
        this.accountJobScheduleService = requireNonNull(accountJobScheduleService);
        this.apiHelper = requireNonNull(apiHelper);
        this.paginationService = requireNonNull(paginationService);
    }
    
    public async handle(context: AuthenticationContext, dto: GetAllAccountTokensRequestDto): Promise<PaginatedResponseDto<AccountJobScheduleApiDto>> {
        const accountId = (context.account as AccountDao).id;
        this.paginationService.validateQueryParams(dto);
        const paginationParams = this.getPaginationParams(dto);

        const accountJobScheduleDaos = await this.accountJobScheduleService.getByAccountIdPaginated(accountId, paginationParams);
        const nextPageKey = this.buildNextPageKey(accountJobScheduleDaos, paginationParams);

        const convertedApiItems = accountJobScheduleDaos.map(item => this.apiHelper.convertAccountJobScheduleApiDto(item)).filter(removeNull) as AccountJobScheduleApiDto[];

        return {
            items: convertedApiItems,
            nextPageKey,
        }
    }

    private getPaginationParams(dto: GetAccountJobSchedulesPaginatedRequestDto): GetAccountJobSchedulesPaginationParams {
        if (!dto.nextPageKey) {
            const order: SortOrder = dto.order === SortOrder.ASCENDING ? SortOrder.ASCENDING : SortOrder.DESCENDING;
            const limit: number = dto.limit || 50;
            const lastSeen: number = order === SortOrder.ASCENDING ? MIN_NUMBER : MAX_NUMBER;
            const state: JobStatus | null = isDefined(dto.state) ? parseJobStatus(dto.state as string) : null;

            return {
                order,
                limit,
                lastSeen,
                state,
            };
        }

        return this.paginationService.decode<GetAccountJobSchedulesPaginationParams>(dto.nextPageKey);
    }

    private buildNextPageKey(items: AccountJobScheduleDao[], oldParams: GetAccountJobSchedulesPaginationParams): string | undefined {
        if (items.length < oldParams.limit) {
            return;
        }

        const newParams: GetAccountJobSchedulesPaginationParams = {
            limit: oldParams.limit,
            order: oldParams.order,
            lastSeen: this.paginationService.getLastElement(items).id,
            state: isDefined(oldParams.state) ? oldParams.state as JobStatus : null,
        };

        return this.paginationService.encode(newParams);
    }

}