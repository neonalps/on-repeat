import { FastifyInstance } from "fastify";
import helloRegistrar from "@router/handlers/hello";
import authHandler from "@src/auth/handler";
import oauthHandler from "@src/oauth/handler";

const handlerProvider = async () => {
    return [
        helloRegistrar,
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