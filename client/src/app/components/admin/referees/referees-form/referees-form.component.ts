import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { IReferees } from '../../../../models/Models';

import { AdminService } from '../../../../services/admin/admin.service';
import { ValidationService } from '../../../../services/validation/validation.service';

@Component({
  selector: 'app-referees-form',
  templateUrl: './referees-form.component.html',
  styleUrls: ['./referees-form.component.css']
})
export class RefereesFormComponent implements OnInit {

  referee: IReferees = {
    id_arbitro: 0,
    nombre: '',
    correo: '',
    rut: null,
    deporte: '',
    nro_contacto: null
  }

  constructor(private adminService: AdminService, private validationService: ValidationService, private activatedRoute: ActivatedRoute, private router: Router, private flashMessage: FlashMessagesService, private title: Title) { }

  params = this.activatedRoute.snapshot.params;

  ngOnInit() {
    if (this.router.url == '/admin/referees/add') {
      this.title.setTitle('Añadir arbitro');
    } else {
      this.title.setTitle('Editar arbitro');
    }
    
    if (this.params.id) {
      this.adminService.getReferee(this.params.id).subscribe(
        res => {
          this.referee = res;
        },
        err => console.error(err)
      );
    }
  }

  addReferee(){
    //Campos requeridos
    if(!this.validationService.ValidateReferee(this.referee)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validacion email
    if(!this.validationService.validateEmail(this.referee.correo)){
      this.flashMessage.show('Ingresa un correo valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    //Validacion telefono (8 digitos)
    if(!this.validationService.validateTel(this.referee.nro_contacto)){
      this.flashMessage.show('Ingresa un telefono valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validacion rut (8 digitos)
    if(!this.validationService.validateRut(this.referee.rut)){
      this.flashMessage.show('Ingresa un rut valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.adminService.addReferees(this.referee).subscribe(
      res => {
        this.flashMessage.show('Arbitro agregado correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/referees']);
        }, 2000);
      },
      err => console.error(err)
    );
  }

  editReferee(){
    //Campos requeridos
    if(!this.validationService.ValidateReferee(this.referee)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validacion email
    if(!this.validationService.validateEmail(this.referee.correo)){
      this.flashMessage.show('Ingresa un correo valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    //Validacion telefono (8 digitos)
    if(!this.validationService.validateTel(this.referee.nro_contacto)){
      this.flashMessage.show('Ingresa un telefono valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validacion rut (8 digitos)
    if(!this.validationService.validateRut(this.referee.rut)){
      this.flashMessage.show('Ingresa un rut valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    this.adminService.updateReferees(this.params.id, this.referee).subscribe(
      res => {
        this.flashMessage.show('Arbitro modificado correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/referees']);
        }, 2000);
      },
      err => console.error(err)
    );
  }

}
