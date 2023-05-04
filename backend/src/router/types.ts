import { HttpMethod } from "@src/http/constants";
import { FastifySchema } from "fastify";

export type RouteDefinition<S, T> = {
    name?: string,
    path: string,
    method: HttpMethod,
    schema: FastifySchema,
    handler: RouteHandler<S, T>,
}

export type HandlerFunction<S, T> = (_: S) => Promise<T>;

export interface RouteProvider<S, T> {
    provide: () => RouteDefinition<S, T>;
}

export interface RouteHandler<S, T> {
    handle: HandlerFunction<S, T>;
}

export type RequestSchema = {
    body?: unknown,
}