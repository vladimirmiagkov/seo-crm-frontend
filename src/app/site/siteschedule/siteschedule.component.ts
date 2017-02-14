import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';

import {UtilService} from 'app/shared/util.service';
import {SiteSchedule} from './siteschedule.model';
import {SiteScheduleService} from './siteschedule.service';
import {SitescheduleDetailComponent} from './siteschedule-detail/siteschedule-detail.component';
import {NotificationService} from 'app/shared/notification.service';

@Component({
  selector: 'app-siteschedule',
  templateUrl: 'siteschedule.component.html',
  styleUrls: ['siteschedule.component.css'],
  providers: [SiteScheduleService]
})
export class SitescheduleComponent implements OnInit {
  public isDialogVisible: boolean;

  public objs: SiteSchedule[];
  public currentObj: SiteSchedule = new SiteSchedule();
  @ViewChild(SitescheduleDetailComponent) sitescheduleDetailComponent: SitescheduleDetailComponent;

  constructor(private notificationService: NotificationService,
              private ref: ChangeDetectorRef,
              private service: SiteScheduleService) {
  }

  ngOnInit() {
    this.service.get().subscribe(
      result => {
        //console.dir(result);
        this.objs = result;
      },
      err => {
        console.log(err);
      });
  }

  edit(id: string) {
    this.currentObj = UtilService.cloneObject(
      this.objs[UtilService.findIndexById(this.objs, id)]
    );
    this.ref.detectChanges(); // Manually fire up Angular change detection system
    this.sitescheduleDetailComponent.setDefaults();
    this.isDialogVisible = true;
  }

  onSaved(event: SiteSchedule) {
    //console.dir(event);
    this.objs[UtilService.findIndexById(this.objs, event.id)] = event;
    this.isDialogVisible = false;
    this.notificationService.addMessage({severity: 'success', summary: 'Update site schedule:', detail: 'Site schedule have been<br>updated successfully.'});
  }
}
