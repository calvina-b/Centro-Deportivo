import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})
export class FieldsListComponent implements OnInit {

  fields: any = []

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Canchas');
    this.getFields();
  }

  getFields() {
    this.adminService.getFields().subscribe(
      res => {
        this.fields = res;
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
}
