import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser, LoginResponseDto } from '@src/app/models';
import { environment } from '@src/environments/environment';
import { validateNotBlank } from '@src/app/util/validation';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { selectAuthUser } from '@src/app/auth/store/auth.selectors';
import { AppState } from '@src/app/store.index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly OAUTH_LOGIN_URL =`${environment.apiBaseUrl}/api/v1/oauth/login`;

  private user: AuthUser | null = null;
  
  constructor(private readonly http: HttpClient, private readonly store: Store<AppState>) {
    this.store.select(selectAuthUser)
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.user = value;
      });
  }

  public handleOAuthLogin(provider: string, code: string): Observable<LoginResponseDto> {
    validateNotBlank(provider, "provider");
    validateNotBlank(code, "code");

    return this.http.post<LoginResponseDto>(AuthService.OAUTH_LOGIN_URL, {
      provider,
      code,
    });
  }

  public isLoggedIn(): boolean {
    return this.user !== null;
  }

  public getAccessToken(): string | null {
    return this.user !== null ? this.user.accessToken : null;
  }

}
