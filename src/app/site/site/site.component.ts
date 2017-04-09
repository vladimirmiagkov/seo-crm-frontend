import {Component, OnInit, Input} from '@angular/core';

import {SelectItem} from 'primeng/primeng';

import {UtilService} from 'app/shared/util.service';
import {Site} from './site.model';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
  providers: [],
  //encapsulation: ViewEncapsulation.None
})
export class SiteComponent implements OnInit {
  @Input() public site: Site;
  @Input() public viewDateFrom: Date;
  @Input() public viewDateTo: Date;

  public isDataBlockVisible: boolean = false;
  public readonly DATABLOCK_VISIBLE_IDENTIFIER: string = 'siteview-datablockvisible-';

  constructor() {
  }

  ngOnInit() {
    this.initDataBlock();
  }

  private initDataBlock() {
    let isVisible = localStorage.getItem(this.DATABLOCK_VISIBLE_IDENTIFIER + this.site.id);
    //console.log('site.component.ts: initDataBlock isVisible = ' + isVisible);
    if (null !== isVisible) {
      this.isDataBlockVisible = (isVisible.toLowerCase() === 'true'); // decode existing value
    } else {
      this.isDataBlockVisible = true;
    }
  }

  public toggleDataBlockVisible() {
    this.isDataBlockVisible = !this.isDataBlockVisible;
    localStorage.setItem(this.DATABLOCK_VISIBLE_IDENTIFIER + this.site.id, String(this.isDataBlockVisible));
  }
}