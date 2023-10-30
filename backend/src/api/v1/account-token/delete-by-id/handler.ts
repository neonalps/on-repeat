
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { AccountTokenService } from "@src/modules/account-token/service";
import { requireNonNull } from "@src/util/common";
import { AccountDao } from "@src/models/classes/dao/account";
import { DeleteAccountTokenByIdRequestDto } from "@src/models/api/delete-account-token-by-id-request";
import { IllegalStateError } from "@src/api/error/illegal-state-error";

export class DeleteAccountTokenByIdHandler implements RouteHandler<DeleteAccountTokenByIdRequestDto, void> {

    private readonly accountTokenService: AccountTokenService;
    
    constructor(accountTokenService: AccountTokenService) {
        this.accountTokenService = requireNonNull(accountTokenService);
    }
    
    public async handle(context: AuthenticationContext, dto: DeleteAccountTokenByIdRequestDto): Promise<void> {
        const accountId = (context.account as AccountDao).id;
        const accountTokenPublicId = dto.publicId;

        const accountTokenDaos = await this.accountTokenService.getAllByAccountId(accountId);

        if (!accountTokenDaos.some(item => item.publicId === accountTokenPublicId)) {
            throw new IllegalStateError("No account token with this ID exists in this account");
        }

        await this.accountTokenService.delete(dto.publicId);
    }

}