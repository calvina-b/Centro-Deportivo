import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';

import { IFields } from '../../../../models/Models';
import { AdminService } from '../../../../services/admin/admin.service';
import { ValidationService } from '../../../../services/validation/validation.service';

@Component({
  selector: 'app-fields-form',
  templateUrl: './fields-form.component.html',
  styleUrls: ['./fields-form.component.css']
})
export class FieldsFormComponent implements OnInit {

  field: IFields = {
    id: null,
    deporte: '',
    precio_Base: null
  };

  constructor(private adminService: AdminService, private validationService: ValidationService, private activatedRoute: ActivatedRoute, private router: Router, private flashMessage: FlashMessagesService, private title: Title) { }

  params = this.activatedRoute.snapshot.params;

  ngOnInit() {
    if (this.router.url == '/admin/fields/add'){
      this.title.setTitle('añadir cancha');
    } else {
      this.title.setTitle('Editar cancha');
    }


    if (this.params.id) {
      this.adminService.getField(this.params.id).subscribe(
        res => {
          this.field = res;
        },
        err => console.error(err)
      );
    }
  }

  addField(){
    //Campos requeridos
    if(!this.validationService.ValidateField(this.field)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.adminService.addFields(this.field).subscribe(
      res => {
        this.flashMessage.show('Cancha agregada correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/fields']);
        }, 2000);
      },
      err => this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 3000})
    );
  }

  editField(){
    //Campos requeridos
    if(!this.validationService.ValidateField(this.field)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.adminService.updateFields(this.params.id, this.field).subscribe(
      res => {
        this.flashMessage.show('Cancha modificada correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/fields']);
        }, 2000);
      },
      err => this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 3000})
    );
  }
}
