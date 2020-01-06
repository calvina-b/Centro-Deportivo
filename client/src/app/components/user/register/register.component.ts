import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/models/Models';

import { AuthService } from '../../../services/user/auth.service'
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data: any = []
  user: IUser = {
    nombre: '',
    nombre_usuario: '',
    password: '',
    rut: null,
    dV: '',
    correo: '',
    telefono: null,
    direccion: ''
  };

  constructor(private authService: AuthService, private validationService: ValidationService, private flashMessage: FlashMessagesService, private router: Router, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Registro');
  }

  registerUser(){
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

    this.authService.logUp(this.user).subscribe(
      res => {
        this.data = res;
        localStorage.setItem('name', this.data.nombre);
        localStorage.setItem('acc', this.data.tipo_cuenta);
        localStorage.setItem('rut', this.data.rut);
        this.router.navigate(['/home']);
      },
      err => this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 3000})
    )
  }
}
