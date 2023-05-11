import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { AuthenticationContext, RequestSchema, RouteDefinition } from "./types";
import { getProviders } from "./providers";
import { HttpMethod } from "@src/http/constants";
import logger from "@src/log/logger";
import { getAuthTokenSigningKey } from "@src/config";
import dependencyManager from "@src/di/manager";
import { AccountService } from "@src/modules/account/service";
import { Dependencies } from "@src/di/dependencies";

export class RouterHelper {

    private static readonly ERROR_UNAUTHENTICATED = "Unauthenticated";

    private static readonly EMPTY_AUTHENTICATION: AuthenticationContext = {
        authenticated: false,
        account: null,
    }

    private constructor() {}

    public static registerRoutes(server: FastifyInstance): void {
        for (const provider of getProviders()) {
            this.registerRoute(server, provider.provide() as RouteDefinition<unknown, unknown>);
        }
    }

    public static registerJwtParser(server: FastifyInstance): void {
        server.register(fastifyJwt, {
            formatUser: (user: any) => user.sub,
            secret: getAuthTokenSigningKey(),
        });
    }

    private static registerRoute(server: FastifyInstance, route: RouteDefinition<unknown, unknown>): void {
        server.route({
            method: route.method,
            url: route.path,
            schema: RouterHelper.convertRequestSchema(route.schema),
            onRequest: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
                if (route.authenticated !== true) {
                    return;
                }

                try {
                    await request.jwtVerify();
                } catch (ex: unknown) {
                    const error = ex as FastifyError;
                    this.sendErrorResponse(reply, route, error.statusCode, new Error(error.message));
                }
            },
            preHandler: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
                const authenticationContext = await RouterHelper.buildAuthenticationContext(route.authenticated, request.user as any);
                
                if (route.authenticated === true && !RouterHelper.hasValidAuthenthicationContextForAuthenticatedRequest(authenticationContext)) {
                    this.sendErrorResponse(reply, route, 401, "Unauthorized");
                    return;
                }

                (request as any).principal = authenticationContext;
            },
            handler: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
                const principal: AuthenticationContext = (request as any)['principal'];

                const body = request.body as unknown;

                try {
                    const response = await route.handler.handle(principal, body) as any;
                    this.sendSuccessResponse(reply, route, response);
                } catch (ex) {
                    logger.error(`Error while handling ${route.path} (${route.name}): ${ex}`);
                    this.sendErrorResponse(reply, route, 500, ex);
                }
            },
        })
    }

    private static async buildAuthenticationContext(isRouteAuthenticated: boolean, publicUserId: string | null): Promise<AuthenticationContext> {
        if (!isRouteAuthenticated) {
            return RouterHelper.EMPTY_AUTHENTICATION;
        }

        if (typeof publicUserId !== 'string') {
            throw new Error("No user ID for authenticated route while building authentication context");
        }

        const accountService = dependencyManager.get<AccountService>(Dependencies.AccountService);
        const account = await accountService.getByPublicId(publicUserId);

        return {
            authenticated: true,
            account,
        };
    }

    private static hasValidAuthenthicationContextForAuthenticatedRequest(context: AuthenticationContext): boolean {
        return !!context && context.authenticated === true && context.account !== null;
    }

    private static sendSuccessResponse(reply: FastifyReply, route: RouteDefinition<unknown, unknown>, responseBody: unknown): void {
        reply
            .code(this.getCodeFromMethod(route.method))
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(responseBody);
    }

    private static sendErrorResponse(reply: FastifyReply, route: RouteDefinition<unknown, unknown>, statusCode: number | undefined, ex: unknown) {
        const errorMessage = (ex as any)?.message || "An error occurred";
        const code = statusCode || 500;

        reply
            .code(code)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ message: errorMessage });
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

