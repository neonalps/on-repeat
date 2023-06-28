import { ChartApiItem } from "@src/api/v1/chart/get-for-period/handler"
import { ChartApiDto } from "@src/models/api/chart"
import { PlayedStatsApiDto } from "./played-stats"

export interface BasicDashboardInformationApiDto {
    charts: {
        tracks: {
            allTime: ChartApiDto<ChartApiItem>,
            current: ChartApiDto<ChartApiItem>,
        },
        artists: {
            allTime: ChartApiDto<ChartApiItem>,
            current: ChartApiDto<ChartApiItem>,
        },
    },
    stats: {
        playedTracks: {
            allTime: PlayedStatsApiDto,
            current: PlayedStatsApiDto,
        },
    },
}