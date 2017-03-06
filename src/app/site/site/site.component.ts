import {Component, OnInit, Input} from '@angular/core';

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

  public isDataBlockVisible: boolean = false; // Block with keywords, pages...
  public readonly DATABLOCKVISIBLE: string = 'siteview-datablockvisible-';
  public dataBlock; // Data: Keywords, pages...

  public viewPager: any;
  public readonly DATABLOCKPAGER: string = 'siteview-datablockpager-';

  constructor(private siteDataBlockService: SiteDataBlockService) {
  }

  ngOnInit() {
    this.initViewPager();
    this.initDataBlock();
    this.loadDataBlock();
  }

  public loadDataBlock() {
    this.siteDataBlockService.get(
      this.site.id,
      this.viewPager.page * this.viewPager.rows,
      this.viewPager.rows,
      this.viewDateFrom,
      this.viewDateTo
    ).subscribe(
      result => {
        console.dir(result);
        this.dataBlock = result.result.pages;
        this.viewPager.totalRecords = result.result.totalRecords;
        this.savePager();
      },
      err => {
        console.log(err);
      });
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
    this.loadDataBlock();
  }

  private initViewPager() {
    this.viewPager = {
      first: 0, // Index of the first record
      rows: 10, // Number of rows to display in new page
      page: 0, // Index of the new page
      pageCount: 0, // Total number of pages
      totalRecords: 100, // Total records
      rowsPerPageOptions: [10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000], // Objects per page
      pageLinkSize: 5, // Max visible pages in navigation
    };

    let totalRecords = localStorage.getItem(this.DATABLOCKPAGER + this.site.id + '-totalRecords');
    if (null !== totalRecords) {
      this.viewPager.totalRecords = +totalRecords;
    }
    let rows = localStorage.getItem(this.DATABLOCKPAGER + this.site.id + '-rows');
    if (null !== rows) {
      this.viewPager.rows = +rows;
    }
    let page = localStorage.getItem(this.DATABLOCKPAGER + this.site.id + '-page');
    if (null !== page) {
      this.viewPager.page = +page;
      this.viewPager.first = +page * +rows;
    }
  }

  private initDataBlock() {
    //console.dir(this.site);
    let isVisible = localStorage.getItem(this.DATABLOCKVISIBLE + this.site.id);
    if (null !== isVisible) {
      this.isDataBlockVisible = (isVisible.toLowerCase() === 'true');
    } else {
      this.isDataBlockVisible = true;
    }
  }

  public toggleDataBlockVisible() {
    this.isDataBlockVisible = !this.isDataBlockVisible;
    localStorage.setItem(this.DATABLOCKVISIBLE + this.site.id, String(this.isDataBlockVisible));
  }

  private savePager() {
    localStorage.setItem(this.DATABLOCKPAGER + this.site.id + '-rows', this.viewPager.rows);
    localStorage.setItem(this.DATABLOCKPAGER + this.site.id + '-page', this.viewPager.page);
    localStorage.setItem(this.DATABLOCKPAGER + this.site.id + '-totalRecords', this.viewPager.totalRecords);
  }
}
