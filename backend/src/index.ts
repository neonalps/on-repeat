import fastify from "fastify";
import { getServerHost, getServerPort } from "@src/configuration";
import logger from "@log/logger";
import scheduler from '@jobs/scheduler';

const server = fastify();

server.get('/hello', async (request, reply) => {
  return `🎵 Hello from on-repeat 🎵`;
});

server.listen({ host: getServerHost(), port: getServerPort() }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server listening at ${address}`);
  
  scheduler.run();
});