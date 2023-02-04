import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const handler = (request: FastifyRequest, reply: FastifyReply) => {
    return `🎵 Hello from on-repeat 🎵`;
};

const registrar = (server: FastifyInstance, options: unknown) => {
    server.get('/oauth/google', handler);
};

export default registrar;