import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from 'app/shared/api.service';
import {User} from './user.model';

@Injectable()
export class UserService {
  public constructor(private apiService: ApiService) {
  }

  public getUsers(): Observable<User[]> {
    return this.apiService.get('/user');
  }

  public createUser(user: User): Observable<User> {
    return this.apiService.post('/user', user);
  }

  public updateUser(user: User): Observable<User> {
    return this.apiService.put('/user/' + user.id, user);
  }

  public deleteUser(id: string): Observable<User> {
    return this.apiService.delete('/user/' + id);
  }
}