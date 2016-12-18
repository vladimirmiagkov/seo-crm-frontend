import {Component} from '@angular/core';

import {AuthenticationService} from './user/authentication.service';

@Component({
  //moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app works!';

  constructor(public authenticationService: AuthenticationService) {
  }
}
