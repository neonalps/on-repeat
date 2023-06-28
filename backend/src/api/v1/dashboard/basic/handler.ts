import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { AccountDao } from "@src/models/classes/dao/account";
import { ChartService } from "@src/modules/chart/service";
import { GetBasicDashboardInformationRequestDto } from "@src/models/api/get-basic-dashboard-information-request";
import { BasicDashboardInformationApiDto } from "@src/models/api/basic-dashboard-information-response";
import { DashboardApiDtoConverter } from "@src/api/v1/dashboard/converter";
import { TimeSource } from "@src/util/time";
import { PlayedTrackService } from "@src/modules/played-tracks/service";

export class GetBasicDashboardInformationHandler implements RouteHandler<GetBasicDashboardInformationRequestDto, BasicDashboardInformationApiDto> {

    private static readonly DASHBOARD_CHARTS_LIMIT = 5;

    private readonly chartService: ChartService;
    private readonly playedTrackService: PlayedTrackService;
    private readonly timeSource: TimeSource;

    constructor(chartService: ChartService, playedTrackService: PlayedTrackService, timeSource: TimeSource) {
        this.chartService = requireNonNull(chartService);
        this.playedTrackService = requireNonNull(playedTrackService);
        this.timeSource = requireNonNull(timeSource);
    }
    
    public async handle(context: AuthenticationContext, _: GetBasicDashboardInformationRequestDto): Promise<BasicDashboardInformationApiDto> {
        const accountId = (context.account as AccountDao).id;

        const from = this.timeSource.getTodayStartOfDay();
        this.timeSource.subtractDays(from, 7);

        const to = this.timeSource.getYesterdayEndOfDay();

        const [allTimeTrackCharts, allTimeArtistCharts, currentTrackCharts, currentArtistCharts, playedTrackStatsAllTime, playedTrackStatsCurrent] = await Promise.all([
            this.chartService.getAccountTrackChartsForPeriod(accountId, null, to, GetBasicDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
            this.chartService.getAccountArtistChartsForPeriod(accountId, null, to, GetBasicDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
            this.chartService.getAccountTrackChartsForPeriod(accountId, from, to, GetBasicDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
            this.chartService.getAccountArtistChartsForPeriod(accountId, from, to, GetBasicDashboardInformationHandler.DASHBOARD_CHARTS_LIMIT),
            this.playedTrackService.getPlayedTrackStatsForPeriod(accountId, null, null),
            this.playedTrackService.getPlayedTrackStatsForPeriod(accountId, from, to),
        ]);

        return {
            charts: {
                tracks: {
                    allTime: DashboardApiDtoConverter.convertToTrackChartApiDto(allTimeTrackCharts, null, to),
                    current: DashboardApiDtoConverter.convertToTrackChartApiDto(currentTrackCharts, from, to),
                },
                artists: {
                    allTime: DashboardApiDtoConverter.convertToArtistChartApiDto(allTimeArtistCharts, null, to),
                    current: DashboardApiDtoConverter.convertToArtistChartApiDto(currentArtistCharts, from, to),
                },
            },
            stats: {
                playedTracks: {
                    allTime: DashboardApiDtoConverter.convertToPlayedStatsApiDto(playedTrackStatsAllTime),
                    current: DashboardApiDtoConverter.convertToPlayedStatsApiDto(playedTrackStatsCurrent),
                },
            },
        };
        
    }

}