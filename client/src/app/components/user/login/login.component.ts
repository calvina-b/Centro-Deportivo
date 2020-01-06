import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { IUser } from 'src/app/models/Models';

import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

data: any = []
user: IUser = {
  correo: '',
  password: ''
};

  constructor(private authService: AuthService, private flashMessage: FlashMessagesService, private title: Title, private router: Router) { }

  ngOnInit() {
    this.title.setTitle('Ingreso');
  }

  loginUser(){
    this.authService.logIn(this.user).subscribe(
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
