import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {tokenNotExpired} from 'angular2-jwt';
//import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('id_token');
  }

  login(username: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(
      'http://rssp6.ru/app_dev.php/api/login_check',
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
          localStorage.setItem('currentUser', JSON.stringify({username: username}));
          localStorage.setItem('id_token', token);

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      } else {
        // return false to indicate failed login
        return false;
      }
    });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('id_token');
  }

  isAuthenticated() {
    // if (localStorage.getItem('id_token')) {
    //   let jwtHelper = new JwtHelper();
    //   let token = localStorage.getItem('id_token');
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