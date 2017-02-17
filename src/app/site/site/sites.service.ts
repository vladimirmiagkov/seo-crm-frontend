import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from 'app/shared/api.service';
import {Site} from './site.model';

@Injectable()
export class SiteService {
  public constructor(private apiService: ApiService) {
  }

  public get(): Observable<Site[]> {
    return this.apiService.get('/site');
  }

  public update(site: Site): Observable<Site> {
    return this.apiService.put('/site/' + site.id, site);
  }
}