import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (localStorage.getItem('id_token')) {
      let jwtHelper = new JwtHelper();
      let token = localStorage.getItem('id_token');

      //console.log(jwtHelper.decodeToken(token));
      //console.log(jwtHelper.getTokenExpirationDate(token));
      //console.log(jwtHelper.isTokenExpired(token));
      if (!jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}