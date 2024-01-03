import { inject } from "@angular/core";
import { AuthService } from "@src/app/auth/auth.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { generateRandomString } from "@src/app/util/common";
import { encode } from "@src/app/util/base64";

export interface PostLoginTarget {
  state: string;
  target: string;
}

export const loggedInGuard = async (_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    if (authService.isLoggedIn()) {
      return true;
    }
  
    const postLoginTarget: PostLoginTarget = {
      state: generateRandomString(12),
      target: state.url,
    };

    const encodedRedirectState = encode(JSON.stringify(postLoginTarget));
    return router.navigate(['/login'], { queryParams: { state: encodedRedirectState } });
};