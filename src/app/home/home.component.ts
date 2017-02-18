import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {LazyLoadEvent} from 'primeng/components/common/api';

import {SiteService} from '../site/site/sites.service';
import {Site} from '../site/site/site.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SiteService]
})
export class HomeComponent implements OnInit {
  public viewSettingsMenu: MenuItem[];
  public viewPager: any;
  public viewDateFrom: Date;
  public viewDateTo: Date;
  public readonly SITEVIEW_PAGERIDENTIFIER: string = 'siteview-pager-';

  public objs: Site[];
  public currentObj: Site = new Site();
  public isNewObj: boolean;

  constructor(private siteService: SiteService) {
  }

  ngOnInit() {
    this.initViewSettingsMenu();
    this.initViewPager();
    this.loadSites();
  }

  public loadSites() {
    //console.dir(this.viewPager);
    // this.siteService.get(
    //   this.viewPager.page * this.viewPager.rows,
    //   this.viewPager.rows,
    //   this.viewDateFrom,
    //   this.viewDateTo
    // ).subscribe(
    //   result => {
    //     console.dir(result);
    //     //this.objs = result;
    //   },
    //   err => {
    //     console.log(err);
    //   });
  }

  public loadCarsLazy(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    // if(this.datasource) {
    //   this.cars = this.datasource.slice(event.first, (event.first + event.rows));
    // }
  }

  // Fire up on pager change
  public onPaginate(event) {
    console.dir(event);
    this.viewPager.first = event.first;
    this.viewPager.rows = event.rows;
    this.viewPager.page = event.page;
    this.viewPager.pageCount = event.pageCount;

    localStorage.setItem(this.SITEVIEW_PAGERIDENTIFIER + 'rows', this.viewPager.rows);
    localStorage.setItem(this.SITEVIEW_PAGERIDENTIFIER + 'page', this.viewPager.page);

    this.loadSites();
  }

  private initViewSettingsMenu() {
    this.viewSettingsMenu = [
      {label: 'Display/sort sites', icon: 'fa-filter',},
      {label: 'Highlight comments', icon: 'fa-commenting-o',},
      {
        label: 'Global defaults', icon: 'fa-cogs',
        items: [
          {
            label: 'Sites screenshots',
            command: (event) => {
              //console.dir(event);
            },
          },
          {label: 'Info-columns',}
        ]
      },
    ];
  }

  private initViewPager() {
    this.viewPager = {
      first: 0, // Index of the first record
      rows: 10, // Number of rows to display in new page
      page: 0, // Index of the new page
      pageCount: 0, // Total number of pages
      totalRecords: 100, // Total records
      rowsPerPageOptions: [1, 5, 10, 20, 50, 100], // Objects per page
      pageLinkSize: 5, // Max visible pages in navigation
    };

    let rows = localStorage.getItem(this.SITEVIEW_PAGERIDENTIFIER + 'rows');
    if (null !== rows) {
      this.viewPager.rows = +rows;
    }
    let page = localStorage.getItem(this.SITEVIEW_PAGERIDENTIFIER + 'page');
    if (null !== page) {
      this.viewPager.page = +page;
      this.viewPager.first = +page * +rows;
    }
  }
}