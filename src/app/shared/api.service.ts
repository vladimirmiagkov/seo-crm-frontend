import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {AuthService} from '../user/auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {
  //public token: string;

  constructor(private http: Http, private authService: AuthService) {
  }

  get(path: string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({'Authorization': 'Bearer ' + this.authService.token});
    let options = new RequestOptions({headers: headers});

    // get api
    return this.http.get(environment.backendRoot + path, options)
      .map((response: Response) => response.json());
  }
}