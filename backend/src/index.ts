import fastify from "fastify";
import { getServerHost, getServerPort } from "@src/configuration";
import { scheduler } from '@jobs/scheduler';

const server = fastify();

server.get('/hello', async (request, reply) => {
  return `🎵 Hello from on-repeat 🎵`;
});

server.listen({ host: getServerHost(), port: getServerPort() }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  scheduler.run();
});