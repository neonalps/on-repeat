import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authHandler from "@src/auth/handler";
import oauthHandler from "@src/oauth/handler";

export abstract class RouteHandler {
    abstract handle(request: FastifyRequest, reply: FastifyReply): void;
}

const handlerProvider = async () => {
    return [
        authHandler,
        oauthHandler,
    ];
};

const registerHandlers = async (server: FastifyInstance): Promise<void> => {
    for (const handler of await handlerProvider()) {
        server.register(handler); 
    }
};

const router = {
    registerHandlers
};

export default router;