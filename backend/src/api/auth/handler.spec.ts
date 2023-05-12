import sinon, { SinonStubbedInstance } from 'sinon';
import chai from 'chai';
import { AuthService } from '@src/modules/auth/service';
import { AuthHandler } from "./handler";
import { describe, test } from 'node:test';
import { CreateAccessTokenResponseDto } from "@src/models/api/create-access-token-response";
import { CreateAccessTokenRequestDto } from "@src/models/api/create-access-token";

const { expect } = chai;

describe('Auth handler', () => {
    test('returns the correct access token', async () => {
        const token = "a secure token";
        const authService: SinonStubbedInstance<AuthService> = sinon.createStubInstance(AuthService);
        authService.createSignedAccessToken.returns(token);
        const authHandler = new AuthHandler(authService);

        const input: CreateAccessTokenRequestDto = {
            accountId: "accountId",
        };

        const expectedResponse = CreateAccessTokenResponseDto.Builder
            .withAccessToken(token)
            .build();

        const actual = await authHandler.handle({ authenticated: false, account: null }, input);
        expect(actual).to.be.not.null;
        expect(actual.accessToken).to.equal(expectedResponse.accessToken);
    });
});