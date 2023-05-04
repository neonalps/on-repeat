import { SCOPE_USER } from "@src/modules/auth/constants";
import { AuthService } from "@src/modules/auth/service";
import { SpotifyClient } from "@src/modules/clients/spotify";
import { IdentityDto } from "@src/models/api/identity";
import { LoginResponseDto } from "@src/models/api/login-response";
import { OauthLoginRequestDto } from "@src/models/api/oauth-login-request";
import { AccountService } from "@src/modules/account/service";
import { RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { JobHelper } from "@src/modules/job/helper";

export class OauthLoginHandler implements RouteHandler<OauthLoginRequestDto, LoginResponseDto> {

    static readonly ERROR_FAILED_TO_LOAD_ACCOUNT = "Failed to load account";
    static readonly ERROR_FAILED_TO_LOAD_IDENTITY = "Failed to load user identity";
    static readonly ERROR_FAILED_TO_LOAD_PROFILE = "Failed to load OAuth user profile";

    private readonly authService: AuthService;
    private readonly accountService: AccountService;
    private readonly jobHelper: JobHelper;
    private readonly spotifyClient: SpotifyClient;

    constructor(
        authService: AuthService,
        accountService: AccountService,
        jobHelper: JobHelper,
        spotifyClient: SpotifyClient,
    ) {
        this.authService = requireNonNull(authService);
        this.accountService = requireNonNull(accountService);
        this.jobHelper = requireNonNull(jobHelper);
        this.spotifyClient = requireNonNull(spotifyClient);
    }

    public async handle(dto: OauthLoginRequestDto): Promise<LoginResponseDto> {
        let identity: IdentityDto | null;
        switch (dto.provider) {
            case "spotify":
                identity = await this.handleSpotify(dto.code);
                break;
            case "google":
            default:
                throw new Error("unhandled OAuth provider");
        }

        if (!identity) {
            throw new Error("Failed to load account");
        }

        const accessToken = this.authService.createSignedAccessToken(identity.publicId, new Set([SCOPE_USER]));

        return {
            identity: {
                displayName: identity.displayName,
                email: identity.email,
                publicId: identity.publicId,
            },
            token: {
                accessToken,
            }
        }
    }

    private async handleSpotify(code: string): Promise<IdentityDto | null> {
        const tokenResponse = await this.spotifyClient.exchangeCodeForToken(code);
        const profile = await this.spotifyClient.getUserProfile(tokenResponse.accessToken);

        if (!profile || !profile.email) {
            throw new Error(OauthLoginHandler.ERROR_FAILED_TO_LOAD_PROFILE);
        }
        
        const { account, wasCreated } = await this.accountService.getOrCreate(profile.email);

        if (!account) {
            throw new Error(OauthLoginHandler.ERROR_FAILED_TO_LOAD_ACCOUNT);
        }

        if (wasCreated === true) {
            await this.jobHelper.insertInitialAccountJobSchedule(account.id, JobHelper.getFetchSpotifyRecentPlayedTracksJobDefinition());
        }

        const displayName = !!profile.displayName ? profile.displayName : null;

        return IdentityDto.Builder
            .withPublicId(account.publicId)
            .withEmail(profile.email)
            .withDisplayName(displayName)
            .build();
    }

}