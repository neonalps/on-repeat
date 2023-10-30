import { ChartApiItem } from "@src/api/v1/chart/get-for-period/handler";
import { ChartApiDto } from "@src/models/api/chart";
import { PlayedStatsApiDto } from "@src/models/api/played-stats";
import { PlayedStatsDao } from "@src/models/classes/dao/played-stats";
import { CHART_TYPE_ALBUMS, CHART_TYPE_ARTISTS, CHART_TYPE_TRACKS } from "@src/modules/chart/constants";
import { isDefined } from "@src/util/common";

export class DashboardApiDtoConverter {

    constructor() {}

    public static convertToAlbumChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        return DashboardApiDtoConverter.convertToChartApiDto(CHART_TYPE_ALBUMS, items, DashboardApiDtoConverter.getNullableDate(from), DashboardApiDtoConverter.getNullableDate(to));
    }

    public static convertToArtistChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        return DashboardApiDtoConverter.convertToChartApiDto(CHART_TYPE_ARTISTS, items, DashboardApiDtoConverter.getNullableDate(from), DashboardApiDtoConverter.getNullableDate(to));
    }

    public static convertToTrackChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        return DashboardApiDtoConverter.convertToChartApiDto(CHART_TYPE_TRACKS, items, DashboardApiDtoConverter.getNullableDate(from), DashboardApiDtoConverter.getNullableDate(to));
    }

    public static convertToPlayedStatsApiDto(item: PlayedStatsDao): PlayedStatsApiDto {
        return {
            from: DashboardApiDtoConverter.getNullableDate(item.from),
            to: DashboardApiDtoConverter.getNullableDate(item.to),
            timesPlayed: item.timesPlayed,
        };
    }

    private static convertToChartApiDto(type: string, items: ChartApiItem[], from?: Date, to?: Date): ChartApiDto<ChartApiItem> {
        return {
            type,
            from,
            to,
            items,
        };
    }

    private static getNullableDate(date: Date | null | undefined): Date | undefined {
        return isDefined(date) ? date as Date : undefined;
    }

}