import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '@src/app/models';
import { environment } from '@src/environments/environment';
import { validateNotBlank } from '@src/app/util/validation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly OAUTH_LOGIN_URL =`${environment.apiBaseUrl}/api/v1/oauth/login`;
  
  constructor(private readonly http: HttpClient) {}

  public handleOAuthLogin(provider: string, code: string): Observable<LoginResponseDto> {
    validateNotBlank(provider, "provider");
    validateNotBlank(code, "code");

    return this.http.post<LoginResponseDto>(AuthService.OAUTH_LOGIN_URL, {
      provider,
      code,
    });
  }

}
