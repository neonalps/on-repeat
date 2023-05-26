import { Dependencies } from "@src/di/dependencies";
import dependencyManager from "@src/di/manager";
import { ChartService } from "@src/modules/chart/service";
import { CreateChartForPeriodRouteProvider } from "@src/api/v1/chart/create-for-period/route-provider";
import { CreateChartForPeriodHandler } from "@src/api/v1/chart/create-for-period/handler";

export const getChartApiRouteProviders = () => {
    const chartService = dependencyManager.get<ChartService>(Dependencies.ChartService);

    const createChartForPeriodHandler = new CreateChartForPeriodHandler(chartService);

    return [
        new CreateChartForPeriodRouteProvider(createChartForPeriodHandler),
    ];
}