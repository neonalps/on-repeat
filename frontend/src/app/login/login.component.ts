import { Component } from '@angular/core';
import { environment } from '@src/environments/environment';
import { OAuthConfig } from '@src/app/models';
import { generateRandomString } from '@src/app/util/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly STATE_LENGTH = 16;

  constructor() { }

  spotifyLogin() {
    const config: OAuthConfig = environment.oauth?.spotify;
    if (!config) {
      throw new Error("Failed to read Spotify OAuth config");
    }

    const queryParams = {
      state: generateRandomString(this.STATE_LENGTH),
      response_type: "code",
      client_id: config.clientId,
      scope: "user-read-private user-read-email",
      redirect_uri: config.redirectUri,
    };
    
    window.location.href = [config.authorizeUrl, "?", new URLSearchParams(queryParams).toString()].join("");
  }

}
