import fastify from "fastify";
import { getNodeEnv, getServerHost, getServerPort, getCryptoKey } from "@src/config";
import logger from "@log/logger";
import router from "@router/router";
import scheduler from '@src/job/scheduler';
import { getAuthorizeUrl, getRecentlyPlayedTracks } from "./oauth/spotify";
import { getSpotifyPlayedTracks } from "./provider/played-tracks";
import { DependencyHelper } from "./di/helper";

const start = async () =>  {
  const server = fastify();
  await router.registerHandlers(server);

  server.listen({ host: getServerHost(), port: getServerPort() }, async (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Server listening at ${address}, environment: ${getNodeEnv()}`);
    
    if (getNodeEnv() === "development") {
      console.log(`🎵 Spotify Authorize URL: ${getAuthorizeUrl()}`);
    }

    DependencyHelper.initDependencies();

    scheduler.run();
  });
};

start();