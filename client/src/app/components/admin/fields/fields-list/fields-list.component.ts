import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})
export class FieldsListComponent implements OnInit {

  fields: any = [];
  id: any = '';

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Canchas');
    this.getFields();
  }

  getFields() {
    this.adminService.getFields().subscribe(
      res => {
        this.fields = res;
        this.collectionSize = this.fields.length;
      },
      err => console.error(err)
    );
  }

  deleteField(id: string){
    this.adminService.deleteFields(id).subscribe(
      res => {
        this.getFields();
        this.flashMessage.show('Cancha eliminada correctamente', {cssClass: 'alert-danger', timeout: 3000});
      },
      err => console.error(err)
    )
  }

  openModal(content: any, id: string) {
    this.id = id;
    this.modal.open(content);
  }

  get fieldsPag() {
    return this.fields.map((field: any, i: any) => ({id: i + 1, ...field}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
