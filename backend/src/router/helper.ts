import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { RequestSchema, RouteDefinition } from "./types";
import { getProviders } from "./providers";
import { HttpMethod } from "@src/http/constants";
import logger from "@src/log/logger";

export class RouterHelper {

    private constructor() {}

    public static registerRoutes(server: FastifyInstance): void {
        for (const provider of getProviders()) {
            this.registerRoute(server, provider.provide() as RouteDefinition<unknown, unknown>);
        }
    }

    private static registerRoute(server: FastifyInstance, route: RouteDefinition<unknown, unknown>): void {
        server.route({
            method: route.method,
            url: route.path,
            schema: RouterHelper.convertRequestSchema(route.schema),
            handler: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
                const body = request.body as unknown;

                try {
                    const response = await route.handler.handle(body) as any;
                    this.sendSuccessResponse(reply, route, response);
                } catch (ex) {
                    logger.error(`Error while handling ${route.path} (${route.name}): ${ex}`);
                    this.sendErrorResponse(reply, route, ex);
                }
            },
        })
    }

    private static sendSuccessResponse(reply: FastifyReply, route: RouteDefinition<unknown, unknown>, responseBody: unknown): void {
        reply
            .code(this.getCodeFromMethod(route.method))
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(responseBody);
    }

    private static sendErrorResponse(reply: FastifyReply, route: RouteDefinition<unknown, unknown>, ex: unknown) {
        reply
            .code(400)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ message: "An error occurred" });
    }

    private static getCodeFromMethod(method: HttpMethod): number {
        if (method === "POST") {
            return 201;
        }

        return 200;
    }

    private static convertRequestSchema(schema: RequestSchema): FastifySchema {
        return {
            body: schema.body,
        }
    }

}

