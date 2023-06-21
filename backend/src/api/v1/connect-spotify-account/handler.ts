
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { AccountTokenService } from "@src/modules/account-token/service";
import { requireNonNull } from "@src/util/common";
import { ConnectSpotifyRequestDto } from "@src/models/api/connect-spotify-account";
import { ConnectSpotifyResponseDto } from "@src/models/api/connect-spotify-account-response";
import { CreateAccountTokenDto } from "@src/models/classes/dto/create-account-token";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { JobHelper } from "@src/modules/job/helper";
import { OAUTH_PROVIDER_SPOTIFY } from "@src/modules/oauth/constants";
import { AccountDao } from "@src/models/classes/dao/account";
import { UuidSource } from "@src/util/uuid";

export class ConnectSpotifyAccountHandler implements RouteHandler<ConnectSpotifyRequestDto, ConnectSpotifyResponseDto> {

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
    
    public async handle(context: AuthenticationContext, dto: ConnectSpotifyRequestDto): Promise<ConnectSpotifyResponseDto> {
        const accountId = (context.account as AccountDao).id;
        const publicId = this.uuidSource.getRandomUuid();
        const tokenResponse = await this.spotifyClient.exchangeCodeForToken(dto.code);

        const createAccountToken = CreateAccountTokenDto.Builder
            .withPublicId(publicId)
            .withAccountId(accountId)
            .withOauthProvider(OAUTH_PROVIDER_SPOTIFY)
            .withAccessToken(tokenResponse.accessToken)
            .withAccessTokenExpiresIn(tokenResponse.expiresIn)
            .withRefreshToken(tokenResponse.refreshToken)
            .withScope(tokenResponse.scope)
            .build();

        await this.accountTokenService.create(createAccountToken);

        if (dto.createFetchRecentlyPlayedTracksJob === true) {
            await this.jobHelper.insertInitialAccountJobScheduleSpotifyRecentlyPlayedTracks(accountId);
        }

        return {
            success: true
        };
    }

    

}