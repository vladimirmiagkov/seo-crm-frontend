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

    //     return new Observable((subscriber) => subscriber.next(
    //       JSON.parse(`
    // {
    //   "result": {
    //     "totalRecords": 2,
    //     "siteSeoStrategyKeywordPage": 0,
    //     "header": [
    //       {
    //         "date": "09"
    //       },
    //       {
    //         "date": "08"
    //       },
    //       {
    //         "date": "07"
    //       },
    //       {
    //         "date": "06"
    //       }
    //     ],
    //     "result": [
    //       {
    //         "id": 1,
    //         "name": "\/123\/page1.html",
    //         "active": true,
    //         "deleted": false,
    //         "createdAt": {
    //           "date": "2017-04-07 19:29:05.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "modifiedAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "site_id": 1,
    //         "created_by_id": 2,
    //         "modified_by_id": 2,
    //         "searchEngine": [
    //           [
    //            
    //           ]
    //         ],
    //         "_dataType": 1
    //       },
    //       {
    //         "id": 1,
    //         "name": "\u043f\u0440\u043e\u0434\u0432\u0438\u0436\u0435\u043d\u0438\u0435 SEO keyword1",
    //         "active": true,
    //         "deleted": false,
    //         "createdAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "modifiedAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "site_id": 1,
    //         "created_by_id": 2,
    //         "modified_by_id": 2,
    //         "from": "Denver",
    //         "searchEngine": [
    //           {
    //             "shortName": "G",
    //             "type": 0,
    //             "id": 1,
    //             "name": "Google",
    //             "active": true,
    //             "_cellZero":  {
    //               "pos": "+1"
    //             },
    //             "_cell": [
    //               {
    //                 "date": "09",
    //                 "pos": "4"
    //               },
    //               {
    //                 "date": "08",
    //                 "pos": "5"
    //               },
    //               {
    //                 "date": "07",
    //                 "pos": ""
    //               },
    //               {
    //                 "date": "06",
    //                 "pos": "3"
    //               }
    //             ]
    //           },
    //           {
    //             "shortName": "Y",
    //             "type": 1,
    //             "id": 2,
    //             "name": "Yandex",
    //             "active": true,
    //             "_cell": [
    //               {
    //                 "date": "09",
    //                 "pos": "8"
    //               },
    //               {
    //                 "date": "08",
    //                 "pos": "8"
    //               },
    //               {
    //                 "date": "07",
    //                 "pos": "11"
    //               },
    //               {
    //                 "date": "06",
    //                 "pos": "999"
    //               },
    //               {
    //                 "date": "05",
    //                 "pos": "999"
    //               }
    //             ]
    //           }
    //         ],
    //         "_dataType": 0
    //       },
    //       {
    //         "id": 2,
    //         "name": "some keyword2",
    //         "active": true,
    //         "deleted": false,
    //         "createdAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "modifiedAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "site_id": 1,
    //         "created_by_id": 2,
    //         "modified_by_id": 2,
    //         "searchEngine": [
    //           [
    //            
    //           ]
    //         ],
    //         "_dataType": 0
    //       },
    //       {
    //         "id": 2,
    //         "name": "\/hhhhhhhhhh?&a=page2",
    //         "active": true,
    //         "deleted": false,
    //         "createdAt": {
    //           "date": "2017-04-07 19:29:05.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "modifiedAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "site_id": 1,
    //         "created_by_id": 2,
    //         "modified_by_id": 2,
    //         "searchEngine": [
    //           [
    //            
    //           ]
    //         ],
    //         "_dataType": 1
    //       },
    //       {
    //         "id": 3,
    //         "name": "keyword3",
    //         "active": true,
    //         "deleted": false,
    //         "createdAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "modifiedAt": {
    //           "date": "2017-04-07 19:29:06.000000",
    //           "timezone_type": 3,
    //           "timezone": "Europe\/Moscow"
    //         },
    //         "site_id": 1,
    //         "created_by_id": 2,
    //         "modified_by_id": 2,
    //         "searchEngine": [
    //           {
    //             "shortName": "Y",
    //             "type": 1,
    //             "id": 2,
    //             "name": "Yandex",
    //             "active": true
    //           }
    //         ],
    //         "_dataType": 0
    //       }
    //     ]
    //   },
    //   "z_totalQueries": 4,
    //   "z_totalExecutionTime": "1ms"
    // }
    //       `)
    //     )).map(o => o);
    return this.apiService.get(path);
  }
}