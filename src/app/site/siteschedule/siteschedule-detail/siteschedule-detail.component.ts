import {Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';

import {SiteSchedule} from '../siteschedule.model';
import {SiteScheduleService} from '../siteschedule.service';

@Component({
  selector: 'app-siteschedule-detail',
  templateUrl: './siteschedule-detail.component.html',
  styleUrls: ['./siteschedule-detail.component.css'],
  providers: [SiteScheduleService]
})
export class SitescheduleDetailComponent implements OnInit {
  public errors: string = '';
  public isLoading: boolean = false;

  @Input() public currentObj: SiteSchedule;

  // Work with "defaults" values
  public readonly USE_DEFAULT: string = 'use_default';
  public readonly USE_ROBOTSTXT: string = 'use_robots.txt';
  //public readonly DONT_USE_ROBOTSTXT: string = 'dont_use_robots.txt';
  public readonly USE_ALL_DISALLOWS: string = 'use_all_disallows';
  public intervalBetweenSiteDownload_usedefault: boolean;
  public intervalBetweenPageDownload_userobotstxt: boolean;
  public intervalBetweenPageDownload_usedefault: boolean;
  public maxTimeLimitForSiteDownload_usedefault: boolean;
  public maxDepthLevelLimitForSiteDownload_usedefault: boolean;

  @Output() saved: EventEmitter<any> = new EventEmitter();

  constructor(private service: SiteScheduleService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  setDefaults() {
    //console.log('setDefaults');
    //console.dir(this.currentObj);
    // Reset view
    this.intervalBetweenSiteDownload_usedefault = false;
    this.intervalBetweenPageDownload_userobotstxt = false;
    this.intervalBetweenPageDownload_usedefault = false;
    this.maxTimeLimitForSiteDownload_usedefault = false;
    this.maxDepthLevelLimitForSiteDownload_usedefault = false;

    // Business logic
    if (this.currentObj.intervalBetweenSiteDownload == this.USE_DEFAULT) {
      this.intervalBetweenSiteDownload_usedefault = true;
    }
    if (this.currentObj.intervalBetweenPageDownload == this.USE_ROBOTSTXT) {
      this.intervalBetweenPageDownload_userobotstxt = true;
    }
    if (this.currentObj.intervalBetweenPageDownload == this.USE_DEFAULT) {
      this.intervalBetweenPageDownload_usedefault = true;
    }
    if (this.currentObj.maxTimeLimitForSiteDownload == this.USE_DEFAULT) {
      this.maxTimeLimitForSiteDownload_usedefault = true;
    }
    if (this.currentObj.maxDepthLevelLimitForSiteDownload == this.USE_DEFAULT) {
      this.maxDepthLevelLimitForSiteDownload_usedefault = true;
    }

  }

  onOffDefaults() {
    this.ref.detectChanges(); // Manually fire up Angular change detection system
    //console.log('onOffDefaults');
    // Interval between site download
    // use default value
    if (this.intervalBetweenSiteDownload_usedefault) {
      this.currentObj.intervalBetweenSiteDownload = this.USE_DEFAULT;
    } else {
      if (this.currentObj.intervalBetweenSiteDownload == this.USE_DEFAULT) {
        this.currentObj.intervalBetweenSiteDownload = '168';
      }
    }

    // Interval between page download
    if (this.intervalBetweenPageDownload_userobotstxt && this.intervalBetweenPageDownload_usedefault) {
      this.intervalBetweenPageDownload_userobotstxt = false;
      this.intervalBetweenPageDownload_usedefault = false;
    }
    // use from robots.txt
    if (this.intervalBetweenPageDownload_userobotstxt) {
      this.intervalBetweenPageDownload_usedefault = false;
      this.currentObj.intervalBetweenPageDownload = this.USE_ROBOTSTXT;
    } else {
      if (this.currentObj.intervalBetweenPageDownload == this.USE_ROBOTSTXT) {
        this.currentObj.intervalBetweenPageDownload = '2';
      }
    }
    //use default value
    if (this.intervalBetweenPageDownload_usedefault) {
      this.intervalBetweenPageDownload_userobotstxt = false;
      this.currentObj.intervalBetweenPageDownload = this.USE_DEFAULT;
    } else {
      if (this.currentObj.intervalBetweenPageDownload == this.USE_DEFAULT) {
        this.currentObj.intervalBetweenPageDownload = '2';
      }
    }

    // Max time limit for site download
    // use default value
    if (this.maxTimeLimitForSiteDownload_usedefault) {
      this.currentObj.maxTimeLimitForSiteDownload = this.USE_DEFAULT;
    } else {
      if (this.currentObj.maxTimeLimitForSiteDownload == this.USE_DEFAULT) {
        this.currentObj.maxTimeLimitForSiteDownload = '168';
      }
    }

    // Max depth level limit for site download
    // use default value
    if (this.maxDepthLevelLimitForSiteDownload_usedefault) {
      this.currentObj.maxDepthLevelLimitForSiteDownload = this.USE_DEFAULT;
    } else {
      if (this.currentObj.maxDepthLevelLimitForSiteDownload == this.USE_DEFAULT) {
        this.currentObj.maxDepthLevelLimitForSiteDownload = '100';
      }
    }

    this.ref.detectChanges(); // Manually fire up Angular change detection system
  }

  save() {
    this.errors = '';
    this.isLoading = true;
    this.service.update(this.currentObj).subscribe(
      result => {
        console.dir(result);
        this.isLoading = false;
        //this.popupMessages.push({severity: 'success', summary: 'Update user:', detail: 'User have been<br>updated successfully.'});
        this.saved.emit(result.result);
      },
      err => {
        //console.dir(err);
        this.errors = err;
        this.isLoading = false;
      });
  }
}
