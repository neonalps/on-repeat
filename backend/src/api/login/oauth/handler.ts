import { SCOPE_USER } from "@src/modules/auth/constants";
import { AuthService } from "@src/modules/auth/service";
import { IdentityDto } from "@src/models/api/identity";
import { LoginResponseDto } from "@src/models/api/login-response";
import { OauthLoginRequestDto } from "@src/models/api/oauth-login-request";
import { AccountService } from "@src/modules/account/service";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";

export class OauthLoginHandler implements RouteHandler<OauthLoginRequestDto, LoginResponseDto> {

    static readonly ERROR_FAILED_TO_LOAD_ACCOUNT = "Failed to load account";
    static readonly ERROR_FAILED_TO_LOAD_IDENTITY = "Failed to load user identity";
    static readonly ERROR_FAILED_TO_LOAD_PROFILE = "Failed to load OAuth user profile";

    private readonly authService: AuthService;
    private readonly accountService: AccountService;
    private readonly spotifyClient: SpotifyClient;

    constructor(
        authService: AuthService,
        accountService: AccountService,
        spotifyClient: SpotifyClient,
    ) {
        this.authService = requireNonNull(authService);
        this.accountService = requireNonNull(accountService);
        this.spotifyClient = requireNonNull(spotifyClient);
    }

    public async handle(_: AuthenticationContext, dto: OauthLoginRequestDto): Promise<LoginResponseDto> {
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
        
        const account = await this.accountService.getOrCreate(profile.email, profile.displayName);

        if (!account) {
            throw new Error(OauthLoginHandler.ERROR_FAILED_TO_LOAD_ACCOUNT);
        }

        return IdentityDto.Builder
            .withPublicId(account.publicId)
            .withDisplayName(account.displayName)
            .withEmail(profile.email)
            .build();
    }

}