import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const handler = (request: FastifyRequest, reply: FastifyReply) => {
    return `🎵 Hello from on-repeat 🎵`;
};

const registrar = (server: FastifyInstance, opts: unknown, done: CallableFunction) => {
    server.get('/hello', handler);
    done();
};

export default registrar;