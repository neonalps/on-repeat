import { FastifyInstance } from "fastify";
import trackProviderService from "@provider/track/service";
import helloRegistrar from "@router/handlers/hello";
import googleRegistrar from "@router/handlers/oauth/google";
import spotifyRegistrar from "@router/handlers/oauth/spotify";

const registrarProvider = async () => {
    const trackProviders = await trackProviderService.getAll();
    console.log('got track providers 🥳', trackProviders);

    // TODO convert providers to registrars

    return [
        helloRegistrar,
        googleRegistrar,
        spotifyRegistrar
    ];
};

const registerRoutes = async (server: FastifyInstance): Promise<void> => {
    for (const registrar of await registrarProvider()) {
        server.register(registrar); 
    }
};;

const router = {
    registerRoutes
};

export default router;