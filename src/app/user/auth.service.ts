import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {tokenNotExpired} from 'angular2-jwt';
import {environment} from '../../environments/environment';

//import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService {
  static CURRENT_USER_JWT_IDENTIFIER: string = 'currentUser';
  static CURRENT_USER_TOKEN_IDENTIFIER: string = 'token'; // 'id_token'

  public apiPath: string = environment.backendRoot + '/api';
  public token: string;

  public constructor(private http: Http) {
    this.token = localStorage.getItem(AuthService.CURRENT_USER_TOKEN_IDENTIFIER);
  }

  public login(username: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(
      this.apiPath + '/login_check',
      '_username=' + username + '&_password=' + password,
      {
        headers: headers
      }
    ).map((response: Response) => {
      //console.dir(response);
      if (response.ok) {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
          localStorage.setItem(AuthService.CURRENT_USER_JWT_IDENTIFIER, JSON.stringify({username: username}));
          localStorage.setItem(AuthService.CURRENT_USER_TOKEN_IDENTIFIER, token);

          // return true to indicate successful login
          //console.log('successful login');
          return true;
        } else {
          // return false to indicate failed login
          console.log('%c failed login', 'color:red;');
          return false;
        }
      } else {
        // return false to indicate failed login
        return false;
      }
    });
  }

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem(AuthService.CURRENT_USER_JWT_IDENTIFIER);
    localStorage.removeItem(AuthService.CURRENT_USER_TOKEN_IDENTIFIER);
  }

  public isAuthenticated() {
    // if (localStorage.getItem(AuthService.CURRENT_USER_TOKEN_IDENTIFIER)) {
    //   let jwtHelper = new JwtHelper();
    //   let token = localStorage.getItem(AuthService.CURRENT_USER_TOKEN_IDENTIFIER);
    //
    //   //console.log(jwtHelper.decodeToken(token));
    //   //console.log(jwtHelper.getTokenExpirationDate(token));
    //   //console.log(jwtHelper.isTokenExpired(token));
    //   if (!jwtHelper.isTokenExpired(token)) {
    //     return true;
    //   }
    // }
    return tokenNotExpired();
  }
}