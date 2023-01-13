import fastify from 'fastify';

const server = fastify();

server.get('/hello', async (request, reply) => {
  return `🎵 Hello from on-repeat 🎵`;
});

server.listen({ port: 3003 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});