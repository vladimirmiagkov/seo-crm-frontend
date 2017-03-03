import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from 'app/shared/api.service';

@Injectable()
export class SiteDataBlockService {
  public constructor(private apiService: ApiService) {
  }

  /**
   * @param siteId
   * @param start Pager: start from item
   * @param limit Pager: count items to fetch
   * @param dateFrom Start date for data
   * @param dateTo Stop date for data
   * @returns {Observable<any>}
   */
  public get(siteId: any, start: any = '', limit: any = '', dateFrom: any = '', dateTo: any = '',): Observable<any> {
    let path: string = '/sitedatablock/' + siteId
      + '?'
      + '&start=' + start
      + '&limit=' + limit
      + '&datefrom=' + dateFrom
      + '&dateto=' + dateTo;
    console.log(path);

    return this.apiService.get(path);
  }
}