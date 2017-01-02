import {Component} from '@angular/core';

import {AuthService} from './user/auth.service';

@Component({
  //moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app works!';

  constructor(public authService: AuthService) {
  }
}
