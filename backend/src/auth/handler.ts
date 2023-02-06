import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import service from "./service";

const createAuthTokenDtoJsonSchema = {
    type: 'object',
    required: ['userId'],
    properties: {
        userId: { type: 'string' }
    }
};

const schema: FastifySchema = {
    body: createAuthTokenDtoJsonSchema
};

const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as CreateAccessTokenDto;
    const signedAccessToken = service.createSignedAccessToken(body.userId);

    reply
        .code(201)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ accessToken: signedAccessToken });
};

const registrar = async (server: FastifyInstance): Promise<void> => {
    server.post('/auth/token', { schema }, handler);
};

export default registrar;