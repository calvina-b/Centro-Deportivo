import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-referees-list',
  templateUrl: './referees-list.component.html',
  styleUrls: ['./referees-list.component.css']
})
export class RefereesListComponent implements OnInit {

  referees: any = [];
  id: any = '';

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Arbitros');
    this.getReferees();
  }

  getReferees(){
    this.adminService.getReferees().subscribe(
      res => {
        this.referees = res;
      },
      err => console.error(err)
    )
  }

  deleteReferee(id: string){
    this.adminService.deleteReferees(id).subscribe(
      res => {
        this.getReferees();
        this.flashMessage.show('Arbitro eliminado correctamente', {cssClass: 'alert-danger', timeout: 3000});
      },
      err => console.error(err)
    )
  }

  openModal(content: any, id: string) {
    this.id = id;
    this.modal.open(content);
  }
}
