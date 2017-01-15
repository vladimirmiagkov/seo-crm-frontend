import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {AuthService} from '../user/auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {
  public apiPath: string = environment.backendRoot + '/api/v1';

  constructor(private http: Http, private authService: AuthService) {
  }

  public get(path: string): Observable<any> {
    return this.http.get(this.apiPath + path, this.getRequestOptions())
      .map((response: Response) => response.json());
  }

  public post(path: string, data: any): Observable<any> {
    return this.http.post(this.apiPath + path, JSON.stringify(data), this.getRequestOptions())
      .map((response: Response) => response.json());
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(this.apiPath + path, this.getRequestOptions())
      .map((response: Response) => response.json());
  }


  private getRequestOptions(): RequestOptions {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token); // add authorization header with jwt token
    return new RequestOptions({headers: headers});
  }
}