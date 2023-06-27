import fastify from "fastify";
import { getAuthTokenSigningKey, getCorsConfig, getNodeEnv, getServerHost, getServerPort } from "@src/config";
import logger from "@src/log/logger";
import { DependencyHelper } from "@src/di/helper";
import { RouteManager } from "@src/router/manager";
import { initAndTestDatabaseConnection } from "@src/db/db";
import dependencyManager from "@src/di/manager";
import { Scheduler } from "@src/modules/scheduler/scheduler";
import { Dependencies } from "@src/di/dependencies";
import { JobRepository } from "@src/modules/job/repository";
import { getRouteProviders } from "@src/api/providers";
import { CorsManager } from "@src/cors/manager";

const start = async () =>  {
  const server = fastify();
  
  await initAndTestDatabaseConnection();
  DependencyHelper.initDependencies();
  JobRepository.initJobs();
  RouteManager.registerJwtParser(server, getAuthTokenSigningKey());
  RouteManager.registerRoutes(server, getRouteProviders());
  await CorsManager.registerCorsConfig(server, getCorsConfig());

  server.listen({ host: getServerHost(), port: getServerPort() }, async (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Server listening at ${address}, environment: ${getNodeEnv()}`);

    const scheduler = dependencyManager.get<Scheduler>(Dependencies.Scheduler);
    scheduler.run();
  });
};

start();