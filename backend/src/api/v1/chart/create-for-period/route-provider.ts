import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { CreateChartsForPeriodRequestDto } from "@src/models/api/create-charts-for-period-request";
import { ChartTrackApiDto } from "@src/models/api/chart-track";
import { ChartApiDto } from "@src/models/api/chart";
import { CreateChartForPeriodHandler } from "@src/api/v1/chart/create-for-period/handler";

export class CreateChartForPeriodRouteProvider implements RouteProvider<CreateChartsForPeriodRequestDto, ChartApiDto<ChartTrackApiDto>> {

    private readonly createChartForPeriodHandler: CreateChartForPeriodHandler;

    constructor(createChartForPeriodHandler: CreateChartForPeriodHandler) {
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
            name: 'CreateChartForPeriod',
            method: 'POST',
            path: '/api/v1/charts',
            schema,
            handler: this.createChartForPeriodHandler,
            authenticated: true,
        };
    }

}