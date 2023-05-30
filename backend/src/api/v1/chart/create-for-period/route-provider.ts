import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { CreateChartsForPeriodRequestDto } from "@src/models/api/create-charts-for-period-request";
import { ChartTrackApiDto } from "@src/models/api/chart-track";
import { ChartApiDto } from "@src/models/api/chart";
import { GetChartForPeriodHandler } from "@src/api/v1/chart/create-for-period/handler";

export class GetChartForPeriodRouteProvider implements RouteProvider<CreateChartsForPeriodRequestDto, ChartApiDto<ChartTrackApiDto>> {

    private readonly createChartForPeriodHandler: GetChartForPeriodHandler;

    constructor(createChartForPeriodHandler: GetChartForPeriodHandler) {
        this.createChartForPeriodHandler = requireNonNull(createChartForPeriodHandler);
    }

    provide(): RouteDefinition<CreateChartsForPeriodRequestDto, ChartApiDto<ChartTrackApiDto>> {
        const schema: RequestSchema = {
            body: {
                type: 'object',
                required: ['from', 'to', 'type'],
                properties: {
                    from: { type: 'number' },
                    to: { type: 'number' },
                    type: { type: 'string' },
                },
            }
        };

        return {
            name: 'GetChartForPeriod',
            method: 'GET',
            path: '/api/v1/charts',
            schema,
            handler: this.createChartForPeriodHandler,
            authenticated: true,
        };
    }

}