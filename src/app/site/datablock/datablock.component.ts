import {Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';

import {Site} from '../site/site.model';
import {SiteDataBlockService} from '../site/siteDataBlock.service';

@Component({
  selector: 'app-datablock',
  templateUrl: './datablock.component.html',
  styleUrls: ['./datablock.component.css'],
  providers: [SiteDataBlockService],
  encapsulation: ViewEncapsulation.None,
})
export class DataBlockComponent implements OnInit {
  // dataBlock - Block with keywords, pages...
  @Input() public site: Site;
  @Input() public viewDateFrom: Date;
  @Input() public viewDateTo: Date;

  public debugqueries; //TODO: remove debug

  public filter = {
    isVisible: true, // Is Filter block visible?
    isApplied: false, // Is Filter used for filtering dataBlock?
    defaults: {
      sortDirections: [{label: 'None', value: ''}, {label: 'ASC', value: 'ASC'}, {label: 'DESC', value: 'DESC'}],
      searchEngines: [{label: 'Google', value: '0'}, {label: 'Yandex', value: '1'}],
    },
    filters: [], // List of all filters
  };

  public pager: any;
  public readonly pagerIdentifier: string = 'siteview-datablockpager-';

  public dataBlock;
  public dataBlockHeader;
  public dataBlockIsLoading: boolean = false;

  public dataBlockRowHeight = 18;


  constructor(private siteDataBlockService: SiteDataBlockService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initFilter();
    this.initViewPager();
    this.initDataBlock();
  }

  public loadDataBlock() {
    this.dataBlockIsLoading = true;
    this.siteDataBlockService.get(
      this.site.id,
      this.pager.page * this.pager.rows,
      this.pager.rows,
      this.viewDateFrom,
      this.viewDateTo,
      JSON.stringify(this.filter)
    ).subscribe(
      result => {
        console.log(result);


        this.dataBlock = result.result.result;
        this.dataBlockHeader = result.result.header;
        this.pager.totalRecords = result.result.totalRecords;
        this.debugqueries = result['z_totalQueries'];


        this.savePager();
        this.dataBlockIsLoading = false;
        this.ref.detectChanges();
      },
      err => {
        console.log(err);
        this.dataBlockIsLoading = false;
      });
  }

  private initDataBlock() {
    //console.log('datablock.component.ts: initDataBlock');
    this.loadDataBlock();
  }

  private initViewPager() {
    this.pager = {
      first: 0, // Index of the first record
      rows: 10, // Number of rows to display in new page
      page: 0, // Index of the new page
      pageCount: 0, // Total number of pages
      totalRecords: 100, // Total records
      rowsPerPageOptions: [10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000], // Objects per page
      pageLinkSize: 5, // Max visible pages in navigation
    };

    let totalRecords = localStorage.getItem(this.pagerIdentifier + this.site.id + '-totalRecords');
    if (null !== totalRecords) {
      this.pager.totalRecords = +totalRecords;
    }
    let rows = localStorage.getItem(this.pagerIdentifier + this.site.id + '-rows');
    if (null !== rows) {
      this.pager.rows = +rows;
    }
    let page = localStorage.getItem(this.pagerIdentifier + this.site.id + '-page');
    if (null !== page) {
      this.pager.page = +page;
      this.pager.first = +page * +rows;
    }
  }

  // Fired up on pager change
  public onPaginate(event) {
    //console.log('onPaginate');
    //console.dir(event);
    this.pager.first = event.first;
    this.pager.rows = event.rows;
    this.pager.page = event.page;
    this.pager.pageCount = event.pageCount;

    this.savePager();
    this.loadDataBlock();
  }

  private savePager() {
    localStorage.setItem(this.pagerIdentifier + this.site.id + '-rows', this.pager.rows);
    localStorage.setItem(this.pagerIdentifier + this.site.id + '-page', this.pager.page);
    localStorage.setItem(this.pagerIdentifier + this.site.id + '-totalRecords', this.pager.totalRecords);
  }

  private initFilter() {
    this.filter.filters = [
      {
        name: 'pageSearchEngine',
        title: 'Search engine (page)',
        type: 'multiSelect',
        valuesAvailable: this.filter.defaults.searchEngines,
        values: [],
        sortDirection: '',
      },
      {
        name: 'keywordSearchEngine',
        title: 'Search engine (keyword)',
        type: 'multiSelect',
        valuesAvailable: this.filter.defaults.searchEngines,
        values: [],
        sortDirection: '',
      },
      {
        name: 'pageName',
        title: 'Name (page)',
        type: 'text',
        values: '',
        sortDirection: 'ASC',
      },
      {
        name: 'keywordName',
        title: 'Name (keyword)',
        type: 'text',
        values: '',
        sortDirection: '',
      },
      {
        name: 'pageTags',
        title: 'Tags (page)',
        type: 'multiSelect',
        valuesAvailable: [{label: 'plastic', value: '0'}, {label: 'fan', value: '1'}],
        values: [],
        sortDirection: '',
      },
      {
        name: 'keywordFromLocation',
        title: 'From location (keyword)',
        type: 'multiSelect',
        valuesAvailable: [{label: 'Denver', value: '0'}, {label: 'NY', value: '1'}],
        values: [],
        sortDirection: '',
      },
      {
        name: 'keywordReq',
        title: 'Req (request) (keyword)',
        type: 'range',
        valueMin: [],
        valueMax: [],
        sortDirection: '',
      },
    ];
  }

  public toggleFilterVisible() {
    this.filter.isVisible = !this.filter.isVisible;
  }

  public applyFilter(enable: boolean) {
    this.filter.isApplied = enable;
    this.loadDataBlock();
  }
}
