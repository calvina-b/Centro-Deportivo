import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  counts: any = [];
  total: any = [];
  scheds: any = [];

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  pageS = 1;
  pageSizeS = 5;
  collectionSizeS = 0;


  constructor(private adminServices: AdminService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Administración');
    this.adminServices.getAdmin().subscribe(
      res => {
        this.counts = res;
        this.total = res.total;
        this.scheds = res.scheds;
        this.collectionSize = this.total.length;
        this.collectionSizeS = this.scheds.length;
      },
      err => console.error(err)
    );
  }

  get totalPag() {
    return this.total.map((total: any, i: any) => ({id: i + 1, ...total}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  get schedsPag() {
    return this.scheds.map((sched: any, i: any) => ({id: i + 1, ...sched}))
    .slice((this.pageS - 1) * this.pageSizeS, (this.pageS - 1) * this.pageSizeS + this.pageSizeS);
  }

}
