import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/models/Models';

import { AdminService } from '../../../../services/admin/admin.service';
import { ValidationService } from '../../../../services/validation/validation.service';
 
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: IUser = {
    id_usuario: 0,
    nombre: '',
    nombre_usuario: '',
    rut: null,
    dV: '',
    correo: '',
    telefono: null,
    direccion: '',
    tipo_cuenta: '',
  };

  constructor(private adminService: AdminService, private validationService: ValidationService, private router: Router, private activedRoute: ActivatedRoute, private flashMessage: FlashMessagesService, private title: Title) { }

  params = this.activedRoute.snapshot.params;

  ngOnInit() {
    this.title.setTitle('Editar usuario');
    if (this.params.id) {
      this.adminService.getUser(this.params.id).subscribe(
        res => {
          this.user = res;
        },
        err => console.error(err)
      )
    }
  }

  editUser(){
    //Campos requeridos
    if(!this.validationService.validateRegister(this.user)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validacion email
    if(!this.validationService.validateEmail(this.user.correo)){
      this.flashMessage.show('Ingresa un correo valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validacion telefono (8 digitos)
    if(!this.validationService.validateTel(this.user.telefono)){
      this.flashMessage.show('Ingresa un telefono valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validacion rut (8 digitos)
    if(!this.validationService.validateRut(this.user.rut)){
      this.flashMessage.show('Ingresa un rut valido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.adminService.updateUsers(this.user.id_usuario, this.user).subscribe(
      res => {
        this.flashMessage.show('Usuario modificado correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/users']);
        }, 2000);
      },  
      err => this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 2000})
    )
  }
}
