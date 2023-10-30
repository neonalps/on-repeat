import { ChartApiDto } from "@src/models/api/chart";
import { ChartArtistApiDto } from "@src/models/api/chart-artist";
import { ChartTrackApiDto } from "@src/models/api/chart-track";
import { CreateChartsForPeriodRequestDto } from "@src/models/api/create-charts-for-period-request";
import { AccountDao } from "@src/models/classes/dao/account";
import { CHART_TYPE_ARTISTS, CHART_TYPE_TRACKS } from "@src/modules/chart/constants";
import { ChartService } from "@src/modules/chart/service";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { isDefined, requireNonNull } from "@src/util/common";
import { DateUtils } from "@src/util/date";

export type ChartApiItem = ChartTrackApiDto | ChartArtistApiDto;

export class GetChartForPeriodHandler implements RouteHandler<CreateChartsForPeriodRequestDto, ChartApiDto<ChartApiItem>> {

    private readonly chartService: ChartService;

    constructor(chartService: ChartService) {
        this.chartService = requireNonNull(chartService);
    }

    public async handle(context: AuthenticationContext, dto: CreateChartsForPeriodRequestDto): Promise<ChartApiDto<ChartApiItem>> {
        const accountId = (context.account as AccountDao).id;
        
        const type = isDefined(dto.type) ? dto.type : CHART_TYPE_TRACKS;
        const from = isDefined(dto.from) ? DateUtils.getDateFromUnixTimestamp(dto.from) : null;
        const to = isDefined(dto.to) ? DateUtils.getDateFromUnixTimestamp(dto.to) : null;

        const items = await this.getChartItems(type, accountId, from, to);

        let response: ChartApiDto<ChartApiItem>;
        response = {
            type,
            items,
        };

        if (from !== null) {
            response = { from, ...response };
        }

        if (to !== null) {
            response = { to, ...response };
        }

        return response;
    }

    private getChartItems(type: string, accountId: number, from: Date | null, to: Date | null): Promise<ChartApiItem[]> {
        switch (type) {
            case CHART_TYPE_ARTISTS:
                return this.chartService.getAccountArtistChartsForPeriod(accountId, from, to);
            case CHART_TYPE_TRACKS:
                return this.chartService.getAccountTrackChartsForPeriod(accountId, from, to);
            default:
                throw new Error(`Illegal state: unknown chart type ${type}`);
        }
    }

}