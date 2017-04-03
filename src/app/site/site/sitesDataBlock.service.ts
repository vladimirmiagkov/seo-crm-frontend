import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

import {ApiService} from 'app/shared/api.service';

@Injectable()
export class SiteDataBlockService {
  public constructor(private apiService: ApiService) {
  }

  /**
   * @param siteId
   * @param offset Pager: offset from item
   * @param limit Pager: count items to fetch
   * @param dateFrom Start date for data
   * @param dateTo Stop date for data
   * @param filter Filter data
   * @returns {Observable<any>}
   */
  public get(siteId: any,
             offset: any = '',
             limit: any = '',
             dateFrom: any = '',
             dateTo: any = '',
             filter: any = '',): Observable<any> {
    let path: string = '/sitedatablock/' + siteId
      + '?'
      + '&offset=' + offset
      + '&limit=' + limit
      + '&datefrom=' + (dateFrom !== '' ? parseInt((new Date(dateFrom).getTime() / 1000).toFixed(0)) : '')
      + '&dateto=' + (dateTo !== '' ? parseInt((new Date(dateTo).getTime() / 1000).toFixed(0)) : '')
      + '&filter=' + encodeURI(filter);
    //console.log(path);

    // return new Observable((subscriber) => subscriber.next(
    //   JSON.parse(`{"result":{"totalRecords":2,"siteSeoStrategyKeywordPage":0,"pages":[{"site":{"namePuny":"http:\/\/www.site1.us","seoStrategyKeywordPage":0,"id":1,"name":"http:\/\/www.site1.us","active":true,"deleted":false,"createdBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"modifiedBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"},"keywords":[{"site":{"namePuny":"http:\/\/www.site1.us","seoStrategyKeywordPage":0,"id":1,"name":"http:\/\/www.site1.us","active":true,"deleted":false,"createdBy":[],"modifiedBy":[],"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"},"pages":[null],"searchEngine":[{"type":0,"id":1,"name":"Google","active":true},{"type":1,"id":2,"name":"Yandex","active":true}],"id":1,"name":"\u043f\u0440\u043e\u0434\u0432\u0438\u0436\u0435\u043d\u0438\u0435 SEO keyword1","active":true,"deleted":false,"createdBy":[],"modifiedBy":[],"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"},{"site":{"namePuny":"http:\/\/www.site1.us","seoStrategyKeywordPage":0,"id":1,"name":"http:\/\/www.site1.us","active":true,"deleted":false,"createdBy":[],"modifiedBy":[],"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"},"pages":[null],"searchEngine":[],"id":2,"name":"some keyword2","active":true,"deleted":false,"createdBy":[],"modifiedBy":[],"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"}],"id":1,"name":"\/123\/page1.html","active":true,"deleted":false,"createdBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"modifiedBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"},{"site":{"namePuny":"http:\/\/www.site1.us","seoStrategyKeywordPage":0,"id":1,"name":"http:\/\/www.site1.us","active":true,"deleted":false,"createdBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"modifiedBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"},"keywords":[{"site":{"namePuny":"http:\/\/www.site1.us","seoStrategyKeywordPage":0,"id":1,"name":"http:\/\/www.site1.us","active":true,"deleted":false,"createdBy":[],"modifiedBy":[],"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"},"pages":[null],"searchEngine":[{"type":1,"id":2,"name":"Yandex","active":true}],"id":3,"name":"keyword3","active":true,"deleted":false,"createdBy":[],"modifiedBy":[],"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"}],"id":2,"name":"\/hhhhhhhhhh.html?&a=page2","active":true,"deleted":false,"createdBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"modifiedBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-03-14T23:13:16+0300","modifiedAt":"2017-03-14T23:13:16+0300"},"createdAt":"2017-03-14T23:13:18+0300","modifiedAt":"2017-03-14T23:13:18+0300"}],"keywordsPositions":{"result":{"1":[{"id":"1","keyword_id":"1","search_engine_id":"2","position":"5","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-14 23:13:18"},{"id":"2","keyword_id":"1","search_engine_id":"2","position":"5","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-13 23:13:18"},{"id":"3","keyword_id":"1","search_engine_id":"1","position":"545","url":"http:\/\/www.site1.us\/123\/","created_at":"2017-03-13 23:13:18"},{"id":"4","keyword_id":"1","search_engine_id":"2","position":"5","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-12 23:13:18"},{"id":"5","keyword_id":"1","search_engine_id":"2","position":"15","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-11 23:13:18"},{"id":"6","keyword_id":"1","search_engine_id":"2","position":"15","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-10 23:13:18"},{"id":"7","keyword_id":"1","search_engine_id":"2","position":"15","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-09 23:13:18"},{"id":"8","keyword_id":"1","search_engine_id":"2","position":"15","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-08 23:13:18"},{"id":"9","keyword_id":"1","search_engine_id":"2","position":"15","url":"http:\/\/www.site1.us\/123\/page1.html","created_at":"2017-03-07 23:13:18"},{"id":"10","keyword_id":"1","search_engine_id":"2","position":"99","url":"http:\/\/www.site1.us","created_at":"2017-03-06 23:13:18"},{"id":"11","keyword_id":"1","search_engine_id":"2","position":"99","url":"http:\/\/www.site1.us","created_at":"2017-03-05 23:13:18"},{"id":"12","keyword_id":"1","search_engine_id":"2","position":"99","url":"http:\/\/www.site1.us","created_at":"2017-03-04 23:13:18"},{"id":"13","keyword_id":"1","search_engine_id":"2","position":"138","url":"http:\/\/www.site1.us","created_at":"2017-03-03 23:13:18"},{"id":"14","keyword_id":"1","search_engine_id":"2","position":"139","url":"http:\/\/www.site1.us","created_at":"2017-03-02 23:13:18"},{"id":"15","keyword_id":"1","search_engine_id":"2","position":"139","url":"http:\/\/www.site1.us","created_at":"2017-03-01 23:13:18"},{"id":"16","keyword_id":"1","search_engine_id":"2","position":"139","url":"http:\/\/www.site1.us","created_at":"2017-02-28 23:13:18"},{"id":"17","keyword_id":"1","search_engine_id":"2","position":"900","url":"http:\/\/www.site1.us\/news","created_at":"2017-02-27 23:13:18"},{"id":"18","keyword_id":"1","search_engine_id":"2","position":"900","url":"http:\/\/www.site1.us\/news","created_at":"2017-02-26 23:13:18"},{"id":"19","keyword_id":"1","search_engine_id":"2","position":"900","url":"http:\/\/www.site1.us\/news","created_at":"2017-02-25 23:13:18"},{"id":"20","keyword_id":"1","search_engine_id":"2","position":"900","url":"http:\/\/www.site1.us\/news","created_at":"2017-02-24 23:13:18"},{"id":"21","keyword_id":"1","search_engine_id":"2","position":"900","url":"http:\/\/www.site1.us\/news","created_at":"2017-02-23 23:13:18"},{"id":"22","keyword_id":"1","search_engine_id":"2","position":"900","url":"http:\/\/www.site1.us\/news","created_at":"2017-02-22 23:13:18"},{"id":"23","keyword_id":"1","search_engine_id":"2","position":"900","url":"http:\/\/www.site1.us\/news","created_at":"2017-02-21 23:13:18"}]}}},"z_totalQueries":13,"z_totalExecutionTime":"4ms"}`)
    // )).map(o => o);
    return this.apiService.get(path);
  }
}