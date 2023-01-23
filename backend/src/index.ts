import fastify from "fastify";
import { getServerHost, getServerPort } from "@src/configuration";
import logger from "@log/logger";
import router from "@router/router";
import scheduler from '@jobs/scheduler';

const server = fastify();
router.registerRoutes(server);

server.listen({ host: getServerHost(), port: getServerPort() }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server listening at ${address}`);
  
  scheduler.run();
});