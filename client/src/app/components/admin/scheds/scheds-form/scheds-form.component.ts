import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { IScheds } from '../../../../models/Models';

import { AdminService } from '../../../../services/admin/admin.service';
import { ValidationService } from '../../../../services/validation/validation.service';

@Component({
  selector: 'app-scheds-form',
  templateUrl: './scheds-form.component.html',
  styleUrls: ['./scheds-form.component.css']
})
export class SchedsFormComponent implements OnInit {

  sched: IScheds = {
    id_horario: 0,
    hora_inicio: '',
    hora_termino: ''
  }

  constructor(private adminService: AdminService, private validationService: ValidationService, private activatedRoute: ActivatedRoute, private router: Router, private flashMessage: FlashMessagesService, private title: Title) { }

  params = this.activatedRoute.snapshot.params;

  ngOnInit() {
    if (this.router.url == '/admin/scheds/add') {
      this.title.setTitle('Añadir horario');
    } else {
      this.title.setTitle('Editar horario');
    }
    
    if (this.params.id) {
      this.adminService.getSched(this.params.id).subscribe(
        res => {
          this.sched = res;
        },
        err => console.error(err)
      );
    }
  }

  addSched(){
    //Campos requeridos
    if(!this.validationService.ValidateSched(this.sched)){
      if(this.sched.hora_inicio < '09:00:00'){
        this.flashMessage.show('Hora de inicio no puede ser menor a 09:00:00', {cssClass: 'alert-danger', timeout: 3000});
      } else if (this.sched.hora_inicio > '22:00:00') {
        this.flashMessage.show('Hora de inicio no puede ser mayor a 22:00:00', {cssClass: 'alert-danger', timeout: 3000});
      } else if (this.sched.hora_termino < '10:00:00') {
        this.flashMessage.show('Hora de termino no puede ser menor a 10:00:00', {cssClass: 'alert-danger', timeout: 3000});
      } else if (this.sched.hora_termino > '23:00:00') {
        this.flashMessage.show('Hora de termino no puede ser mayor a 23:00:00', {cssClass: 'alert-danger', timeout: 3000});
      }
      return false  
    }

    this.adminService.addScheds(this.sched).subscribe(
      res => {
        this.flashMessage.show('Horario agregado correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/scheds']);
        }, 2000);
      },
      err => console.error(err)
    );
  }

  editSched(){
    //Campos requeridos
    if(!this.validationService.ValidateSched(this.sched)){
      if(this.sched.hora_inicio < '09:00:00'){
        this.flashMessage.show('Hora de inicio no puede ser anterior a 09:00:00', {cssClass: 'alert-danger', timeout: 3000});
      } else if (this.sched.hora_inicio > '22:00:00') {
        this.flashMessage.show('Hora de inicio no puede ser posterior a 22:00:00', {cssClass: 'alert-danger', timeout: 3000});
      } else if (this.sched.hora_termino < '10:00:00') {
        this.flashMessage.show('Hora de termino no puede ser anterior a 10:00:00', {cssClass: 'alert-danger', timeout: 3000});
      } else if (this.sched.hora_termino > '23:00:00') {
        this.flashMessage.show('Hora de termino no puede ser posterior a 23:00:00', {cssClass: 'alert-danger', timeout: 3000});
      }
      return false  
    }
    
    this.adminService.updateScheds(this.params.id, this.sched).subscribe(
      res => {
        this.flashMessage.show('Horario modificado correctamente', {cssClass: 'alert-success', timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/admin/scheds']);
        }, 2000);
      },
      err => console.error(err)
    );
  }

}
