import fastify from "fastify";
import { getNodeEnv, getServerHost, getServerPort, getCryptoKey } from "@src/config";
import logger from "@log/logger";
import router from "@router/router";
import scheduler from '@jobs/scheduler';
import { getAuthorizeUrl } from "./oauth/spotify";

const start = async () =>  {
  const server = fastify();
  await router.registerHandlers(server);

  server.listen({ host: getServerHost(), port: getServerPort() }, (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Server listening at ${address}, environment: ${getNodeEnv()}`);

    logger.info('\n');
    
    if (getNodeEnv() === "development") {
      console.log(`🎵 Spotify Authorize URL: ${getAuthorizeUrl('mystate')}`);
    }
    
    
    scheduler.run();
  });
};

start();