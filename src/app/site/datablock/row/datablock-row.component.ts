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

  constructor() {
  }

  ngOnInit() {
  }
}
