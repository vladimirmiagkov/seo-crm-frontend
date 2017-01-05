import {Injectable} from '@angular/core';

import {ApiService} from '../shared/api.service';
import {User} from './user.model';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {
  }

  getUsers()/*: Observable<User[]>*/ {
    this.apiService.get('/api/users').subscribe(
      result => {
        console.dir(result);
        //this.error = 'Username or password is incorrect';
      },
      err => {
        console.log(err);
        //this.error = String(err);
      });
  }
}