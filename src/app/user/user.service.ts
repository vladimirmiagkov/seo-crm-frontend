import {Injectable} from '@angular/core';

import {ApiService} from '../shared/api.service';
import {User} from './user.model';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {
  }

  getUsers(): Observable<User[]> {
    return this.apiService.get('/user');
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post('/user', user);
  }

  updateUser(user: User): Observable<User> {
    return this.apiService.put('/user/' + user.id, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.apiService.delete('/user/' + id);
  }
}