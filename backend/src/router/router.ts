import { FastifyInstance } from "fastify";
import helloRegistrar from "@router/handlers/hello"; 

const registrarProvider = () => {
    return [
        helloRegistrar
    ];
};

const registerRoutes = (server: FastifyInstance): void => {
    for (const registrar of registrarProvider()) {
        server.register(registrar); 
    }
};;

const router = {
    registerRoutes
};

export default router;