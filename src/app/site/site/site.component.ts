import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';

import {SelectItem} from 'primeng/primeng';

import {UtilService} from 'app/shared/util.service';
import {Site} from './site.model';
import {SiteDataBlockService} from './sitesDataBlock.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
  providers: [SiteDataBlockService]
})
export class SiteComponent implements OnInit {
  @Input() public site: Site;
  @Input() public viewDateFrom: Date;
  @Input() public viewDateTo: Date;

  public debugqueries; //TODO: remove debug

  public filter = {
    isVisible: true,
    defaults: {
      sortDirections: [{label: 'None', value: ''}, {label: 'ASC', value: 'asc'}, {label: 'DESC', value: 'desc'}],
      searchEngines: [{label: 'Google', value: '0'}, {label: 'Yandex', value: '1'}], // All available Search Engines
    },
    page: {
      searchEngine: {
        value: [],
        sort: ''
      }
    }
  };

  public dataBlockPager: any;
  public readonly DATABLOCK_PAGER_IDENTIFIER: string = 'siteview-datablockpager-';

  // dataBlock - Block with keywords, pages...
  public dataBlock; // Main array with all data from backend
  public isDataBlockLoading: boolean = false;
  public isDataBlockVisible: boolean = false;
  public readonly DATABLOCK_VISIBLE_IDENTIFIER: string = 'siteview-datablockvisible-';

  public siteSeoStrategy: number; // 0 = pages contains keywords; 1 = keywords contains pages
  //public enumerateDates: string[] = []; // Array with days enumeration(from viewDateFrom to viewDateTo), like ['08', '07', '06', ...]

  constructor(private siteDataBlockService: SiteDataBlockService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initViewPager();
    this.initDataBlock();
    //this.generateEnumerateDates();
  }

  public loadDataBlock() {
    this.isDataBlockLoading = true;
    this.siteDataBlockService.get(
      this.site.id,
      this.dataBlockPager.page * this.dataBlockPager.rows,
      this.dataBlockPager.rows,
      this.viewDateFrom,
      this.viewDateTo
    ).subscribe(
      result => {
        console.log(result);

        // Set data
        this.dataBlock = result.result;
        this.siteSeoStrategy = +result.siteSeoStrategyKeywordPage;
        this.dataBlockPager.totalRecords = result.result.totalRecords;
        this.debugqueries = result['z_totalQueries'];

        // Proceed some values

        this.savePager();
        this.isDataBlockLoading = false;
        this.ref.detectChanges();
      },
      err => {
        console.log(err);
        this.isDataBlockLoading = false;
      });
  }


  // Fired up on pager change
  public onPaginate(event) {
    //console.log('onPaginate');
    //console.dir(event);
    this.dataBlockPager.first = event.first;
    this.dataBlockPager.rows = event.rows;
    this.dataBlockPager.page = event.page;
    this.dataBlockPager.pageCount = event.pageCount;

    this.savePager();
    this.loadDataBlock();
  }

  private initViewPager() {
    this.dataBlockPager = {
      first: 0, // Index of the first record
      rows: 10, // Number of rows to display in new page
      page: 0, // Index of the new page
      pageCount: 0, // Total number of pages
      totalRecords: 100, // Total records
      rowsPerPageOptions: [10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000], // Objects per page
      pageLinkSize: 5, // Max visible pages in navigation
    };

    let totalRecords = localStorage.getItem(this.DATABLOCK_PAGER_IDENTIFIER + this.site.id + '-totalRecords');
    if (null !== totalRecords) {
      this.dataBlockPager.totalRecords = +totalRecords;
    }
    let rows = localStorage.getItem(this.DATABLOCK_PAGER_IDENTIFIER + this.site.id + '-rows');
    if (null !== rows) {
      this.dataBlockPager.rows = +rows;
    }
    let page = localStorage.getItem(this.DATABLOCK_PAGER_IDENTIFIER + this.site.id + '-page');
    if (null !== page) {
      this.dataBlockPager.page = +page;
      this.dataBlockPager.first = +page * +rows;
    }
  }

  private initDataBlock() {
    let isVisible = localStorage.getItem(this.DATABLOCK_VISIBLE_IDENTIFIER + this.site.id);
    //console.log('initDataBlock DATABLOCK_VISIBLE_IDENTIFIER = ' + isVisible);
    if (null !== isVisible) {
      this.isDataBlockVisible = (isVisible.toLowerCase() === 'true'); // decode existing value
    } else {
      this.isDataBlockVisible = true;
    }
    if (this.isDataBlockVisible) {
      this.loadDataBlock();
    }
  }

  public toggleDataBlockVisible() {
    this.isDataBlockVisible = !this.isDataBlockVisible;
    localStorage.setItem(this.DATABLOCK_VISIBLE_IDENTIFIER + this.site.id, String(this.isDataBlockVisible));
    //console.log('toggleDataBlockVisible this.isDataBlockVisible = ' + this.isDataBlockVisible);
    if (this.isDataBlockVisible) {
      this.loadDataBlock();
    }
  }

  public toggleFilterVisible() {
    this.filter.isVisible = !this.filter.isVisible;
    //localStorage.setItem(this.DATABLOCK_VISIBLE_IDENTIFIER + this.site.id, String(this.isDataBlockVisible));
    //console.log('toggleDataBlockVisible this.isDataBlockVisible = ' + this.isDataBlockVisible);
  }

  private savePager() {
    localStorage.setItem(this.DATABLOCK_PAGER_IDENTIFIER + this.site.id + '-rows', this.dataBlockPager.rows);
    localStorage.setItem(this.DATABLOCK_PAGER_IDENTIFIER + this.site.id + '-page', this.dataBlockPager.page);
    localStorage.setItem(this.DATABLOCK_PAGER_IDENTIFIER + this.site.id + '-totalRecords', this.dataBlockPager.totalRecords);
  }

  // private generateEnumerateDates() {
  //   if (!this.viewDateFrom) {
  //     this.viewDateFrom = new Date(); // Set defaults
  //   }
  //   if (!this.viewDateTo) {
  //     this.viewDateTo = new Date(); // Set defaults
  //     this.viewDateTo.setMonth(this.viewDateTo.getMonth() - 1); // Default date range is: 1 month
  //   }
  //
  //   let interval = 1 + UtilService.numberOfDaysBetweenTwoDates(this.viewDateFrom, this.viewDateTo);
  //   //console.log('interval=' + interval);
  //   for (let i = 0; i < interval; i++) {
  //     let tmp: Date = new Date(+this.viewDateFrom);
  //     tmp.setDate(this.viewDateFrom.getDate() - i);
  //     //console.log('tmp=' + tmp + ' day=' + tmp.getDate());
  //     this.enumerateDates.push(('00' + (tmp.getDate())).slice(-2));
  //   }
  // }
}