import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { IItems } from '../../../../models/Models';

import { AdminService } from '../../../../services/admin/admin.service';
import { ValidationService } from '../../../../services/validation/validation.service';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css']
})
export class ItemsFormComponent implements OnInit {

  item: IItems = {
    cod: null,
    id_cancha: null,
    deporte_cancha: '',
    nombre_art: '',
    valor: null,
    precio_costo: null,
    estado: ''
  }

  constructor(private adminService: AdminService, private validationService: ValidationService, private activedRoute: ActivatedRoute, private router: Router, private flashMessage: FlashMessagesService, private title: Title) { }

  params = this.activedRoute.snapshot.params;

  ngOnInit() {
    if (this.router.url == '/admin/items/add'){
      this.title.setTitle('Añadir Articulo');
    } else {
      this.title.setTitle('Editar articulo');
    }

    
    if (this.params.id) {
      this.adminService.getItem(this.params.id, this.params.cod).subscribe(
        res => {
          this.item = res;
        },
        err => console.error(err)
      );
    }
  }

  addItem(){
    //Campos requeridos
    if(!this.validationService.ValidateItem(this.item)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.adminService.addItems(this.item).subscribe(
      res => {
        this.flashMessage.show('Articulo agregado correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/items']);
        }, 2000);
      },
      err => this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 3000})
    );
  }

  editItem(){
    //Campos requeridos
    if(!this.validationService.ValidateItem(this.item)){
      this.flashMessage.show('Completa todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    this.adminService.updateItems(this.params.id, this.params.cod, this.item).subscribe(
      res => {
        this.flashMessage.show('Articulo modificado correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/items']);
        }, 2000);
      },
      err => this.flashMessage.show(err.error, {cssClass: 'alert-danger', timeout: 3000})
    );
  }

}
