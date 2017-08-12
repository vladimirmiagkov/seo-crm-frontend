import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (this.authService.isAuthenticated()) {
      //console.log('%c AuthGuard.isAuthenticated = true', 'color:green;');
      return true;
    }

    // Not logged in, so redirect to login page.
    console.log('%c AuthGuard.isAuthenticated = Not logged in, so redirect to login page.', 'color:red;');
    this.router.navigate(['/login']);
    return false;
  }
}