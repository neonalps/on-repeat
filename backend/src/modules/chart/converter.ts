import { ChartApiItem } from "@src/api/v1/chart/get-for-period/handler";
import { ChartApiDto } from "@src/models/api/chart";
import { CHART_TYPE_ALBUMS, CHART_TYPE_ARTISTS, CHART_TYPE_TRACKS } from "@src/modules/chart/constants";
import { isDefined } from "@src/util/common";

export class ChartApiDtoConverter {

    constructor() {}

    public static convertToAlbumChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        return ChartApiDtoConverter.convertToChartApiDto(CHART_TYPE_ALBUMS, items, ChartApiDtoConverter.getNullableDate(from), ChartApiDtoConverter.getNullableDate(to));
    }

    public static convertToArtistChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        return ChartApiDtoConverter.convertToChartApiDto(CHART_TYPE_ARTISTS, items, ChartApiDtoConverter.getNullableDate(from), ChartApiDtoConverter.getNullableDate(to));
    }

    public static convertToTrackChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        return ChartApiDtoConverter.convertToChartApiDto(CHART_TYPE_TRACKS, items, ChartApiDtoConverter.getNullableDate(from), ChartApiDtoConverter.getNullableDate(to));
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