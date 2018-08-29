import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authLoginBaseUrl = "/api/auth/login"
  private authLogoutBaseUrl = "/api/auth/logout"
  private authLoginConcatUrl: string;
  private authLogoutConcatUrl: string;

  isAuth: boolean;
  userName: string;

  constructor(private http: HttpClient, private backEndService: BackendService) {
    this.authLoginConcatUrl = backEndService.getBackendUrl().concat(this.authLoginBaseUrl);
    this.authLogoutConcatUrl = backEndService.getBackendUrl().concat(this.authLogoutBaseUrl);
  }

  setUserName(userName: string): Observable<boolean> {
    return this.http.post<boolean>(this.authLoginConcatUrl, { 'userName': userName }).pipe(
      tap(data => {
        this.userName = userName;
        this.isAuth = true;
        return data;
      })
    );
  }

  getUserName() {
    return this.userName;
  }

  isUserAuth() {
    return this.isAuth;
  }

  signOut() {
    this.userName = "";
    this.isAuth = false;
  }
}
