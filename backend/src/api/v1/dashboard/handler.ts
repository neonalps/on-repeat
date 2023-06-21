import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { AccountDao } from "@src/models/classes/dao/account";
import { ChartService } from "@src/modules/chart/service";
import { GetDashboardInformationRequestDto } from "@src/models/api/get-dashboard-information-request";
import { DashboardInformationApiDto } from "@src/models/api/dashboard-information-response";
import { ChartApiDtoConverter } from "@src/modules/chart/converter";
import { TimeSource } from "@src/util/time";

export class GetDashboardInformationHandler implements RouteHandler<GetDashboardInformationRequestDto, DashboardInformationApiDto> {

    private static readonly DASHBOARD_CHARTS_LIMIT = 5;

    private readonly chartService: ChartService;
    private readonly timeSource: TimeSource;

    constructor(chartService: ChartService, timeSource: TimeSource) {
        this.chartService = requireNonNull(chartService);
        this.timeSource = requireNonNull(timeSource);
    }
    
    public async handle(context: AuthenticationContext, _: GetDashboardInformationRequestDto): Promise<DashboardInformationApiDto> {
        const accountId = (context.account as AccountDao).id;

        const from = this.timeSource.getTodayStartOfDay();
        this.timeSource.subtractDays(from, 7);

        const to = this.timeSource.getYesterdayEndOfDay();

        const [allTimeTrackCharts, allTimeArtistCharts, currentTrackCharts, currentArtistCharts] = await Promise.all([
            this.chartService.getAccountTrackChartsForPeriod(accountId, null, null, GetDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
            this.chartService.getAccountArtistChartsForPeriod(accountId, null, null, GetDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
            this.chartService.getAccountTrackChartsForPeriod(accountId, from, to, GetDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
            this.chartService.getAccountArtistChartsForPeriod(accountId, from, to, GetDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
        ]);

        return {
            charts: {
                tracks: {
                    allTime: ChartApiDtoConverter.convertToTrackChartApiDto(allTimeTrackCharts, null, null),
                    current: ChartApiDtoConverter.convertToTrackChartApiDto(currentTrackCharts, from, to),
                },
                artists: {
                    allTime: ChartApiDtoConverter.convertToArtistChartApiDto(allTimeArtistCharts, null, null),
                    current: ChartApiDtoConverter.convertToArtistChartApiDto(currentArtistCharts, from, to),
                },
            },
        }
        
    }

}