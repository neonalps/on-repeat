import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const handler = (request: FastifyRequest, reply: FastifyReply) => {
    return `🎵 Hello from on-repeat 🎵`;
};

const registrar = async (server: FastifyInstance, options: unknown): Promise<void> => {
    server.get('/oauth/google', handler);
};

export default registrar;