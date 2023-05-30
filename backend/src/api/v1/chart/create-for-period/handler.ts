import { ChartApiDto } from "@src/models/api/chart";
import { ChartTrackApiDto } from "@src/models/api/chart-track";
import { CreateChartsForPeriodRequestDto } from "@src/models/api/create-charts-for-period-request";
import { AccountDao } from "@src/models/classes/dao/account";
import { ChartService } from "@src/modules/chart/service";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { DateUtils } from "@src/util/date";

export class GetChartForPeriodHandler implements RouteHandler<CreateChartsForPeriodRequestDto, ChartApiDto<ChartTrackApiDto>> {

    private readonly chartService: ChartService;

    constructor(chartService: ChartService) {
        this.chartService = requireNonNull(chartService);
    }

    public async handle(context: AuthenticationContext, dto: CreateChartsForPeriodRequestDto): Promise<ChartApiDto<ChartTrackApiDto>> {
        const accountId = (context.account as AccountDao).id;
        const type = dto.type; // TODO validate
        const from = DateUtils.getDateFromUnixtimestamp(dto.from);
        const to = DateUtils.getDateFromUnixtimestamp(dto.to);
        
        const chartTracks = await this.chartService.createAccountTrackChartsForPeriod(accountId, from, to);

        return {
            from,
            to,
            items: chartTracks,
        };
    }

}