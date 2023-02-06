import { FastifyInstance } from "fastify";
import trackProviderService from "@provider/track/service";
import helloRegistrar from "@router/handlers/hello";
import authHandler from "@src/auth/handler";
import googleRegistrar from "@router/handlers/oauth/google";
import spotifyRegistrar from "@router/handlers/oauth/spotify";

const handlerProvider = async () => {
    const trackProviders = await trackProviderService.getAll();
    console.log('got track providers 🥳', trackProviders);

    // TODO convert providers to registrars

    return [
        helloRegistrar,
        authHandler,
        googleRegistrar,
        spotifyRegistrar
    ];
};

const registerHandlers = async (server: FastifyInstance): Promise<void> => {
    for (const handler of await handlerProvider()) {
        server.register(handler); 
    }
};;

const router = {
    registerHandlers
};

export default router;