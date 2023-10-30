import { requireNonNull } from "@src/util/common";
import { RequestSchema, RouteDefinition, RouteProvider } from "@src/router/types";
import { CreateChartsForPeriodRequestDto } from "@src/models/api/create-charts-for-period-request";
import { ChartApiDto } from "@src/models/api/chart";
import { ChartApiItem, GetChartForPeriodHandler } from "@src/api/v1/chart/get-for-period/handler";
import { CHART_TYPES } from "@src/modules/chart/constants";

export class GetChartForPeriodRouteProvider implements RouteProvider<CreateChartsForPeriodRequestDto, ChartApiDto<ChartApiItem>> {

    private readonly handler: GetChartForPeriodHandler;

    constructor(createChartForPeriodHandler: GetChartForPeriodHandler) {
        this.handler = requireNonNull(createChartForPeriodHandler);
    }

    provide(): RouteDefinition<CreateChartsForPeriodRequestDto, ChartApiDto<ChartApiItem>> {
        const schema: RequestSchema = {
            querystring: {
                type: 'object',
                required: [],
                properties: {
                    from: { 
                        type: 'number', 
                    },
                    to: { 
                        type: 'number', 
                    },
                    type: { 
                        type: 'string', 
                        enum: CHART_TYPES,
                    },
                },
            }
        };

        return {
            name: 'GetChartForPeriod',
            method: 'GET',
            path: '/api/v1/charts',
            schema,
            handler: this.handler,
            authenticated: true,
        };
    }

}