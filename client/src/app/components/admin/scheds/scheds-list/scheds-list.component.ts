import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-scheds-list',
  templateUrl: './scheds-list.component.html',
  styleUrls: ['./scheds-list.component.css']
})
export class SchedsListComponent implements OnInit {

  scheds: any = [];

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Horarios');
    this.getScheds();
  }

  getScheds(){
    this.adminService.getScheds().subscribe(
      res => {
        this.scheds = res;
      },
      err => console.error(err)
    )
  }

  deleteSched(id: string){
    this.adminService.deleteScheds(id).subscribe(
      res => {
        this.getScheds();
        this.flashMessage.show('Horario eliminado correctamente', {cssClass: 'alert-danger', timeout: 3000});
      },
      err => console.error(err)
    )
  }

}
