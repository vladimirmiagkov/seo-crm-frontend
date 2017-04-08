import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

import {Site} from '../site/site/site.model';
import {SiteService} from '../site/site/site.service';
import {SiteComponent} from '../site/site/site.component';

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
  public readonly SITEVIEW_PAGER_IDENTIFIER: string = 'siteview-pager-';

  public sites: Site[];
  //public currentSite: Site = new Site();
  //public isNewSite: boolean;
  @ViewChild(SiteComponent) siteComponent: SiteComponent;

  constructor(private siteService: SiteService) {
  }

  ngOnInit() {
    this.viewDateFrom = new Date(); // Set defaults
    this.viewDateTo = new Date(); // Set defaults
    this.viewDateTo.setMonth(this.viewDateTo.getMonth() - 1);

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
    //     this.sites = result.result.sites;
    //     this.viewPager.totalRecords = result.result.totalRecords;
    //     this.savePager();
    //   },
    //   err => {
    //     console.log(err);
    //   });

    this.sites = JSON.parse(`[{"namePuny":"https:\/\/123.nu","id":1,"name":"https:\/\/123.nu","active":true,"deleted":false,"createdBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-02-23T09:41:55+0300","modifiedAt":"2017-02-23T09:41:55+0300"},"modifiedBy":{"id":2,"username":"user1","email":"info2@rsite.ru","enabled":true,"lastLogin":null,"roles":["ROLE_CLIENT"],"createdBy":null,"modifiedBy":null,"createdAt":"2017-02-23T09:41:55+0300","modifiedAt":"2017-02-23T09:41:55+0300"},"createdAt":"2017-02-23T09:41:56+0300","modifiedAt":"2017-02-23T09:41:56+0300"}]`);
  }

  // Fired up on pager change
  public onPaginate(event) {
    //console.log('onPaginate');
    //console.dir(event);
    this.viewPager.first = event.first;
    this.viewPager.rows = event.rows;
    this.viewPager.page = event.page;
    this.viewPager.pageCount = event.pageCount;

    this.savePager();
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
      rowsPerPageOptions: [1, 2, 5, 10, 20, 50, 100], // Objects per page
      pageLinkSize: 5, // Max visible pages in navigation
    };

    let totalRecords = localStorage.getItem(this.SITEVIEW_PAGER_IDENTIFIER + 'totalRecords');
    if (null !== totalRecords) {
      this.viewPager.totalRecords = +totalRecords;
    }
    let rows = localStorage.getItem(this.SITEVIEW_PAGER_IDENTIFIER + 'rows');
    if (null !== rows) {
      this.viewPager.rows = +rows;
    }
    let page = localStorage.getItem(this.SITEVIEW_PAGER_IDENTIFIER + 'page');
    if (null !== page) {
      this.viewPager.page = +page;
      this.viewPager.first = +page * +rows;
    }
  }

  private savePager() {
    localStorage.setItem(this.SITEVIEW_PAGER_IDENTIFIER + 'rows', this.viewPager.rows);
    localStorage.setItem(this.SITEVIEW_PAGER_IDENTIFIER + 'page', this.viewPager.page);
    localStorage.setItem(this.SITEVIEW_PAGER_IDENTIFIER + 'totalRecords', this.viewPager.totalRecords);
  }
}