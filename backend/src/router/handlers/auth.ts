import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import service from "./service";

const createAuthTokenDtoJsonSchema = {
    type: 'object',
    required: ['accountId'],
    properties: {
        accountId: { type: 'string' }
    }
};

const createAuthTokenSchema: FastifySchema = {
    body: createAuthTokenDtoJsonSchema
};

const createAuthTokenHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const body = request.body as CreateAccessTokenDto;
    const signedAccessToken = service.createSignedAccessToken(body.accountId);

    reply
        .code(201)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ accessToken: signedAccessToken });
};

const handler = async (server: FastifyInstance): Promise<void> => {
    server.post('/api/v1/auth/token', { schema: createAuthTokenSchema }, createAuthTokenHandler);
};

export default handler;