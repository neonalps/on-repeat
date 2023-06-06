import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { ChartService } from "@src/modules/chart/service";
import { GetChartForPeriodRouteProvider } from "@src/api/v1/chart/get-for-period/route-provider";
import { GetChartForPeriodHandler } from "@src/api/v1/chart/get-for-period/handler";

export const getChartApiRouteProviders = () => {
    const chartService = dependencyManager.get<ChartService>(Dependencies.ChartService);

    const getChartForPeriodHandler = new GetChartForPeriodHandler(chartService);

    return [
        new GetChartForPeriodRouteProvider(getChartForPeriodHandler),
    ];
}