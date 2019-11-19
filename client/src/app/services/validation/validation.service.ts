import { Injectable } from '@angular/core';

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // VALIDACIONES USUARIO

  validateRegister(user: Model.IUser){
    if(user.nombre == undefined || user.nombre_usuario == undefined || user.correo == undefined || user.password == undefined || user.telefono == undefined || user.direccion == undefined || user.rut == undefined || user.dV == undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateEmail(email: any){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateTel(phone: any){
    if(phone.length < 8){
      return false;
    } else {
      return true;
    }
  }

  validateRut(rut: any){
    if(rut.length < 8){
      return false;
    } else {
      return true;
    }
  }

  // VALIDACIONES HORARIOS

  ValidateSched(sched: Model.IScheds){
    if(sched.hora_inicio < '09:00:00' || sched.hora_inicio > '22:00:00' || sched.hora_termino < '10:00:00' || sched.hora_termino > '23:00:00') {
      return false;
    } else {
      return true;
    }
  }

  // VALIDACIONES CANCHAS

  ValidateField(field: Model.IFields){
    if(field.id == undefined || field.deporte == undefined || field.precio_Base == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // VALIDACIONES ARBITRO

  ValidateReferee(referee: Model.IReferees){
    if(referee.nombre == undefined || referee.correo == undefined || referee.deporte == undefined || referee.nro_contacto == undefined || referee.rut == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // VALIDACIONES ARTICULOS

  ValidateItem(item: Model.IItems){
    if(item.cod == undefined || item.id_cancha == undefined || item.deporte_cancha == undefined || item.nombre_art == undefined || item.valor == undefined || item.precio_costo == undefined || item.estado == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // VALIDACIONES TEAM RESERVA

  validateTeam(team: Model.ITeam) {
    if(team.nombre == undefined || team.nombre_representante == undefined || team.correo_representante == undefined || team.telefono == undefined) {
      return false;
    } else {
      return true;
    }
  }
  
}

