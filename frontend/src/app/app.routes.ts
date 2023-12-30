import { Routes } from '@angular/router';
import { LoginComponent } from '@src/app/login/login.component';
import { OauthSpotifyComponent } from '@src/app/oauth/spotify/oauth.spotify.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'oauth/spotify', component: OauthSpotifyComponent },
];
