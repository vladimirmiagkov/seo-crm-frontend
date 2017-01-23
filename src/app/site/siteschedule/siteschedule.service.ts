import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from 'app/shared/api.service';
import {SiteSchedule} from './siteschedule.model';

@Injectable()
export class SiteScheduleService {
  public constructor(private apiService: ApiService) {
  }

  public get(): Observable<SiteSchedule[]> {
    return this.apiService.get('/siteschedule');
  }

  public update(siteSchedule: SiteSchedule): Observable<SiteSchedule> {
    return this.apiService.put('/siteschedule/' + siteSchedule.id, siteSchedule);
  }
}