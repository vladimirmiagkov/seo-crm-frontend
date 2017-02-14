import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from 'app/shared/api.service';
import {User} from './user.model';

@Injectable()
export class UserService {
  public constructor(private apiService: ApiService) {
  }

  public get(): Observable<User[]> {
    return this.apiService.get('/user');
  }

  public create(user: User): Observable<User> {
    return this.apiService.post('/user', user);
  }

  public update(user: User): Observable<User> {
    return this.apiService.put('/user/' + user.id, user);
  }

  public delete(id: string): Observable<User> {
    return this.apiService.delete('/user/' + id);
  }
}