import { ChartApiItem } from "@src/api/v1/chart/get-for-period/handler";
import { ChartApiDto } from "@src/models/api/chart";
import { CHART_TYPE_ALBUMS, CHART_TYPE_ARTISTS, CHART_TYPE_TRACKS } from "@src/modules/chart/constants";
import { isDefined } from "@src/util/common";

export class ChartApiDtoConverter {

    constructor() {}

    public static convertToAlbumChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        if (isDefined(from) && isDefined(to)) {
            return ChartApiDtoConverter.convertToChartApiDtoWithPeriod(CHART_TYPE_ALBUMS, items, from as Date, to as Date);
        }

        return ChartApiDtoConverter.convertToChartApiDtoWithoutPeriod(CHART_TYPE_ALBUMS, items);
    }

    public static convertToArtistChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        if (isDefined(from) && isDefined(to)) {
            return ChartApiDtoConverter.convertToChartApiDtoWithPeriod(CHART_TYPE_ARTISTS, items, from as Date, to as Date);
        }

        return ChartApiDtoConverter.convertToChartApiDtoWithoutPeriod(CHART_TYPE_ARTISTS, items);
    }

    public static convertToTrackChartApiDto(items: ChartApiItem[], from: Date | null, to: Date | null): ChartApiDto<ChartApiItem> {
        if (isDefined(from) && isDefined(to)) {
            return ChartApiDtoConverter.convertToChartApiDtoWithPeriod(CHART_TYPE_TRACKS, items, from as Date, to as Date);
        }

        return ChartApiDtoConverter.convertToChartApiDtoWithoutPeriod(CHART_TYPE_TRACKS, items);
    }

    public static convertToChartApiDtoWithoutPeriod(type: string, items: ChartApiItem[]): ChartApiDto<ChartApiItem> {
        return {
           type,
           items,
        }
    }

    public static convertToChartApiDtoWithPeriod(type: string, items: ChartApiItem[], from: Date, to: Date): ChartApiDto<ChartApiItem> {
        return {
           type,
           from,
           to,
           items,
        }
    }

}