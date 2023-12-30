import { inject } from "@angular/core";
import { AuthService } from "@src/app/auth/auth.service";
import { Router } from "@angular/router";

export const loggedInGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    if (authService.isLoggedIn()) {
      return true;
    }
  
    return router.navigate(["/login"]);
};