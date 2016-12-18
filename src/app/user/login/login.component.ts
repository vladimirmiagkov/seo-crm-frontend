import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../authentication.service';
import {User} from '../user.model';

@Component({
  //moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User;
  loading = false;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.logout(); // reset login status
    this.user.username = 'admin'; //todo: remove
    this.user.password = '123456'; //todo: remove
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
        (result) => {
          //console.dir(result);
          if (result === true) {
            this.router.navigate(['/']);
          } else {
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
        },
        (err) => {
          //console.log(err)
          this.error = String(err);
          this.loading = false;
        });
  }
}