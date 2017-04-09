import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-datablock-row',
  templateUrl: './datablock-row.component.html',
  styleUrls: ['./datablock-row.component.css'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class DataBlockRowComponent implements OnInit {
  //@Input() public site: Site;
  //@Input() public viewDateFrom: Date;
  //@Input() public viewDateTo: Date;
  @Input() public row: any;
  @Input() public searchEngine: any;
  @Input() public index: any; // searchEngine sequential number

  constructor() {
  }

  ngOnInit() {
    console.log('-------------------------------------');
    console.log(this.row);
    console.log(this.searchEngine);
    // console.log(this.index);
  }
}
