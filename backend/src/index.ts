import dotenv from "dotenv";
import * as env from "env-var";
import fastify from "fastify";

dotenv.config();
const PORT: number = env.get('PORT').required().asIntPositive();
const server = fastify();

server.get('/hello', async (request, reply) => {
  return `🎵 Hello from on-repeat 🎵`;
});

server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});