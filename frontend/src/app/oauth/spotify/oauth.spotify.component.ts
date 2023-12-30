import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@src/app/auth/auth.service';
import { login } from '@src/app/auth/store/auth.actions';
import { AuthState } from '@src/app/auth/store/auth.selectors';
import { hasText } from '@src/app/util/common';
import { getDateFromUnixTimestamp, parseJwt } from '@src/app/util/token.util';
import { first } from 'rxjs';

@Component({
  selector: 'app-oauth-spotify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oauth.spotify.component.html',
})
export class OauthSpotifyComponent implements OnInit {

  constructor(
    private readonly authService: AuthService, 
    private readonly router: Router, 
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (!hasText(code)) {
      throw new Error(`Spotify OAuth handler called without code`);
    }

    this.authService.handleOAuthLogin("spotify", code as string)
      .pipe(first())
      .subscribe((authResponse) => {
        const accessToken = authResponse.token.accessToken;
        const tokenPayload = parseJwt(accessToken);

        const accessTokenExpiresAtUnix: number = tokenPayload["exp"];

        const authState: AuthState = {
          isLoggedIn: true,
          auth: {
            userId: authResponse.identity.publicId,
            username: authResponse.identity.displayName,
            email: authResponse.identity.email,
            accessToken: accessToken,
            accessTokenExpiresAt: getDateFromUnixTimestamp(accessTokenExpiresAtUnix),
            refreshToken: null,
          },
        };

        this.store.dispatch(login({ auth: authState }));
        setTimeout(() => this.router.navigate(["/"]), 100);
      });
  }

}
