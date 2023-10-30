
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { AccountTokenService } from "@src/modules/account-token/service";
import { requireNonNull } from "@src/util/common";
import { CreateAccountTokenDto } from "@src/models/classes/dto/create-account-token";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { JobHelper } from "@src/modules/job/helper";
import { OAUTH_PROVIDER_SPOTIFY } from "@src/modules/oauth/constants";
import { AccountDao } from "@src/models/classes/dao/account";
import { UuidSource } from "@src/util/uuid";
import { CreateAccountTokenRequestDto } from "@src/models/api/create-account-token-request";
import { CreateAccountTokenResponseDto } from "@src/models/api/create-account-token-response";
import { OauthTokenResponse } from "@src/models/dto/oauth-token-response";
import { IllegalStateError } from "@src/api/error/illegal-state-error";

export class CreateAccountTokenHandler implements RouteHandler<CreateAccountTokenRequestDto, CreateAccountTokenResponseDto> {

    private readonly accountTokenService: AccountTokenService;
    private readonly jobHelper: JobHelper;
    private readonly spotifyClient: SpotifyClient;
    private readonly uuidSource: UuidSource;
    
    constructor(accountTokenService: AccountTokenService, jobHelper: JobHelper, spotifyClient: SpotifyClient, uuidSource: UuidSource) {
        this.accountTokenService = requireNonNull(accountTokenService);
        this.jobHelper = requireNonNull(jobHelper);
        this.spotifyClient = requireNonNull(spotifyClient);
        this.uuidSource = requireNonNull(uuidSource);
    }
    
    public async handle(context: AuthenticationContext, dto: CreateAccountTokenRequestDto): Promise<CreateAccountTokenResponseDto> {
        const accountId = (context.account as AccountDao).id;

        const tokenResponse = await this.handleForProvider(dto.provider, dto.code);

        const publicId = this.uuidSource.getRandomUuid();

        const createAccountToken = CreateAccountTokenDto.Builder
            .withPublicId(publicId)
            .withAccountId(accountId)
            .withOauthProvider(dto.provider)
            .withAccessToken(tokenResponse.accessToken)
            .withAccessTokenExpiresIn(tokenResponse.expiresIn)
            .withRefreshToken(tokenResponse.refreshToken)
            .withScope(tokenResponse.scope)
            .build();

        await this.accountTokenService.create(createAccountToken);

        if (dto.createFetchRecentlyPlayedTracksJob === true) {
            await this.createInitialJobSchedulesForProvider(dto.provider, accountId);
        }

        return {
            success: true
        };
    }

    private async handleForProvider(provider: string, code: string): Promise<OauthTokenResponse> {
        switch (provider) {
            case OAUTH_PROVIDER_SPOTIFY:
                return this.spotifyClient.exchangeCodeForToken(code);
            default:
                throw new IllegalStateError(`Illegal provider ${provider} detected for creating account token`);
        }
    }

    private async createInitialJobSchedulesForProvider(provider: string, accountId: number): Promise<void> {
        switch (provider) {
            case OAUTH_PROVIDER_SPOTIFY:
                return this.jobHelper.insertInitialAccountJobScheduleSpotifyRecentlyPlayedTracks(accountId);
            default:
                throw new IllegalStateError(`Illegal provider ${provider} detected for creating initial account job schedules`);
        }
    }

}