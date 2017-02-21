import {Component, OnInit, Input} from '@angular/core';

import {Site} from './site.model';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @Input() public site: Site;

  public isDataBlockVisible: boolean = false; // Block with keywords, pages...
  public readonly SITEVIEW_DATABLOCKVISIBLE: string = 'siteview-datablockvisible-';
  public dataBlock; // Data: Keywords, pages...

  constructor() {
  }

  ngOnInit() {
    this.initDataBlock();
  }

  private initDataBlock() {
    //console.dir(this.site);
    let isVisible = localStorage.getItem(this.SITEVIEW_DATABLOCKVISIBLE + this.site.id);
    if (null !== isVisible) {
      this.isDataBlockVisible = (isVisible.toLowerCase() === 'true');
    } else {
      this.isDataBlockVisible = true;
    }
    this.loadDataBlock();
  }

  public toggleDataBlockVisible() {
    this.isDataBlockVisible = !this.isDataBlockVisible;
    localStorage.setItem(this.SITEVIEW_DATABLOCKVISIBLE + this.site.id, String(this.isDataBlockVisible));
  }

  public loadDataBlock() {

  }

  // public loadDataLazy(event: LazyLoadEvent) {
  //   console.log('loadDataLazy');
  //   console.dir(event);
  //   //event.first = First row offset
  //   //event.rows = Number of rows per page
  //   //event.sortField = Field name to sort with
  //   //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
  //   //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
  //
  //   // if(this.datasource) {
  //   //   this.cars = this.datasource.slice(event.first, (event.first + event.rows));
  //   // }
  // }
}
