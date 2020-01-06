import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as Model from '../../../models/Models';
import { OtherService } from '../../../services/other/other.service';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  sports: any = [];
  fields: any = [];
  postSport: Model.IFieldInfo = {
    deporte: ''
  }

  constructor(private otherService: OtherService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Canchas');
    this.getFields();
  }

  getFields() {
    this.otherService.fields().subscribe(
      res => {
        this.sports = res;
      },
      err => console.error(err)
    )
  }

  selectField(sport: any) {
    this.postSport = {
      deporte: sport
    }
  }

  postField() {
    this.otherService.fieldInfo(this.postSport).subscribe(
      res => {
        this.fields = res;
      },
      err => console.error(err)
    )
  }

  openModal(content: any) {
    this.modal.open(content);
  }

}
