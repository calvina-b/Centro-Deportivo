import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-scheds-list',
  templateUrl: './scheds-list.component.html',
  styleUrls: ['./scheds-list.component.css']
})
export class SchedsListComponent implements OnInit {

  scheds: any = [];
  id: any = '';

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Horarios');
    this.getScheds();
  }

  getScheds(){
    this.adminService.getScheds().subscribe(
      res => {
        this.scheds = res;
        this.collectionSize = this.scheds.length;
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

  openModal(content: any, id: string) {
    this.id = id;
    this.modal.open(content);
  }

  get schedsPag() {
    return this.scheds.map((sched: any, i: any) => ({id: i + 1, ...sched}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
