import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from '../../shared/api.service';
import {Site} from './site.model';

@Injectable()
export class SiteService {
  public constructor(private apiService: ApiService) {
  }

  /**
   * @param start Pager: start from item
   * @param limit Pager: count items to fetch
   * @param dateFrom Start date for sites data
   * @param dateTo Stop date for sites data
   * @returns {Observable<any>}
   */
  public get(start: any = '', limit: any = '', dateFrom: any = '', dateTo: any = '',): Observable<any> {
    let path: string = '/site?'
      + '&start=' + start
      + '&limit=' + limit
      + '&datefrom=' + (dateFrom !== '' ? parseInt((new Date(dateFrom).getTime() / 1000).toFixed(0)) : '')
      + '&dateto=' + (dateTo !== '' ? parseInt((new Date(dateTo).getTime() / 1000).toFixed(0)) : '');
    console.log(path);

    return this.apiService.get(path);
  }

  // public update(site: Site): Observable<any> {
  //   return this.apiService.put('/site/' + site.id, site);
  // }
}