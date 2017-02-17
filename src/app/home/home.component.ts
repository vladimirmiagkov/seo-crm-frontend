import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private viewSettingsMenu: MenuItem[];
  //private viewPager: number = 5;
  private viewDateFrom: Date;
  private viewDateTo: Date;

  constructor() {
  }

  ngOnInit() {
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

  public viewPagerPaginate(event) {
    console.dir(event);
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }
}
