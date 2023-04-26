import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { OAUTH_PROVIDERS, OAUTH_PROVIDER_SPOTIFY } from "./constants";
import service from "./service";
import { exchangeCodeForToken } from "../clients/spotify";
import userService from "@user/service";
import accountTokenService from "@src/account-token/service";
import { getNowPlusSeconds } from "@src/util/time";

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
    const identityInformation: SpotifyUserProfile = await service.retrieveIdentityInformation(oauthToken.accessToken);

    if (!identityInformation || !identityInformation.email) {
        // TODO return error
    }

    const user = await userService.getOrCreate(identityInformation.email);

    if (user === null) {
        throw new Error("could not create user");
    }

    const accountToken = await accountTokenService.create({
        oauthProvider: OAUTH_PROVIDER_SPOTIFY,
        accountId: user.id,
        accessToken: oauthToken.accessToken,
        accessTokenExpiresAt: getNowPlusSeconds(oauthToken.expiresIn),
        refreshToken: oauthToken.refreshToken,
        scope: oauthToken.scope,
    });

    if (accountToken === null) {
        throw new Error("could not create account token");
    }

    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ oauthToken, identity: identityInformation, user });
};

const handler = async (server: FastifyInstance): Promise<void> => {
    server.get('/oauth/spotify', {}, getCodeTokenHandler);
    server.post('/api/v1/oauth/token', { schema: retrieveOauthTokenSchema }, retrieveOauthTokenHandler);
};

export default handler;