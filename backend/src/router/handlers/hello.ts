import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const handler = (request: FastifyRequest, reply: FastifyReply) => {
    return `🎵 Hello from on-repeat 🎵`;
};

const registrar = async (server: FastifyInstance, opts: unknown, done: CallableFunction): Promise<void> => {
    server.get('/hello', handler);
};

export default registrar;