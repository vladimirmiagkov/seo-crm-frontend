import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';

import {Message} from 'primeng/primeng';

import {UtilService} from 'app/shared/util.service';
import {SiteSchedule} from './siteschedule.model';
import {SiteScheduleService} from './siteschedule.service';
import {SitescheduleDetailComponent} from './siteschedule-detail/siteschedule-detail.component';

@Component({
  selector: 'app-siteschedule',
  templateUrl: 'siteschedule.component.html',
  styleUrls: ['siteschedule.component.css'],
  providers: [SiteScheduleService]
})
export class SitescheduleComponent implements OnInit {
  public isDialogVisible: boolean;
  public popupMessages: Message[] = [];

  public objs: SiteSchedule[];
  public currentObj: SiteSchedule = new SiteSchedule();
  @ViewChild(SitescheduleDetailComponent) sitescheduleDetailComponent: SitescheduleDetailComponent;

  constructor(private service: SiteScheduleService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.service.get()
      .subscribe(
        result => {
          //console.dir(result);
          this.objs = result;
        },
        err => {
          console.log(err);
        });
  }

  editSiteSchedule(id: string) {
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
    this.popupMessages.push({severity: 'success', summary: 'Update site schedule:', detail: 'Site schedule have been<br>updated successfully.'});
  }
}
