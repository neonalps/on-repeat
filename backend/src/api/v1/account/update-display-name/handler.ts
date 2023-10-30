import { UpdateAccountDisplayNameRequestDto } from "@src/models/api/update-account-display-name-request";
import { AccountDao } from "@src/models/classes/dao/account";
import { AccountService } from "@src/modules/account/service";
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";

export class UpdateAccountDisplayNameHandler implements RouteHandler<UpdateAccountDisplayNameRequestDto, void> {

    private readonly accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = requireNonNull(accountService);
    }

    public async handle(context: AuthenticationContext, dto: UpdateAccountDisplayNameRequestDto): Promise<void> {
        const accountId = (context.account as AccountDao).id;
       
        await this.accountService.updateDisplayName(accountId, dto.displayName);
    }

}