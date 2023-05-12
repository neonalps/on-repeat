import { AuthService } from "@src/modules/auth/service";
import { requireNonNull } from "@src/util/common";
import { CreateAccessTokenResponseDto } from "@src/models/api/create-access-token-response";
import { CreateAccessTokenRequestDto } from "@src/models/api/create-access-token";
import { AuthenticationContext, RouteHandler } from "@src/router/types";

export class AuthHandler implements RouteHandler<CreateAccessTokenRequestDto, CreateAccessTokenResponseDto> {

    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = requireNonNull(authService);
    }

    public async handle(_: AuthenticationContext, dto: CreateAccessTokenRequestDto): Promise<CreateAccessTokenResponseDto> {
        const token = this.authService.createSignedAccessToken(dto.accountId, new Set());

        return CreateAccessTokenResponseDto.Builder
            .withAccessToken(token)
            .build();
    }

}