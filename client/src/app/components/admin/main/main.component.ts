import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  counts:any = [];


  constructor(private adminServices: AdminService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Administración');
    this.adminServices.getAdmin().subscribe(
      res => {
        this.counts = res;
      },
      err => console.error(err)
    );
  }

}
