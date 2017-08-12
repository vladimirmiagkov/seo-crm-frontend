import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from '../../shared/api.service';
import {SiteSchedule} from './siteschedule.model';

@Injectable()
export class SiteScheduleService {
  public constructor(private apiService: ApiService) {
  }

  public get(): Observable<any> {
    return this.apiService.get('/siteschedule');
  }

  public update(siteSchedule: SiteSchedule): Observable<any> {
    return this.apiService.put('/siteschedule/' + siteSchedule.id, siteSchedule);
  }
}