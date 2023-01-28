import fastify from "fastify";
import { getNodeEnv, getServerHost, getServerPort } from "@src/config";
import logger from "@log/logger";
import router from "@router/router";
import scheduler from '@jobs/scheduler';

const start = async () =>  {
  const server = fastify();
  await router.registerRoutes(server);

  server.listen({ host: getServerHost(), port: getServerPort() }, (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Server listening at ${address}, environment: ${getNodeEnv()}`);
    
    scheduler.run();
  });
};

start();