import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { OAUTH_PROVIDERS } from "./constants";
import service from "./service";
import { exchangeCodeForToken } from "./spotify";

type GetCodeTokenRequest = FastifyRequest<{
    Querystring: { code: string }
}>

const retrieveOauthTokenDtoJsonSchema = {
    type: 'object',
    required: ['provider', 'code'],
    properties: {
        provider: { type: 'string', enum: OAUTH_PROVIDERS },
        code: { type: 'string' },
        state: { type: 'string' }
    }
};

const retrieveOauthTokenSchema: FastifySchema = {
    body: retrieveOauthTokenDtoJsonSchema
};

const retrieveOauthTokenHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const body = request.body as RetrieveOauthTokenDto;
    
    const oauthToken: OauthTokenResponse = await service.retrieveOauthToken(body);

    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ oauthToken });
};

const getCodeTokenHandler = async (request: GetCodeTokenRequest, reply: FastifyReply): Promise<void> => {
    const { code } = request.query;

    const oauthToken: OauthTokenResponse = await exchangeCodeForToken(code);

    // TODO store in token service (provider, scope, expiration, access, refresh)

    const identityInformation: UserProfile = await service.retrieveIdentityInformation(oauthToken.accessToken);

    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ oauthToken, identity: identityInformation });
};

const handler = async (server: FastifyInstance): Promise<void> => {
    server.get('/oauth/spotify', {}, getCodeTokenHandler);
    server.post('/api/v1/oauth/token', { schema: retrieveOauthTokenSchema }, retrieveOauthTokenHandler);
};

export default handler;