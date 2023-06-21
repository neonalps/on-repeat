import { ChartApiItem } from "@src/api/v1/chart/get-for-period/handler"
import { ChartApiDto } from "@src/models/api/chart"

export interface DashboardInformationApiDto {
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
}