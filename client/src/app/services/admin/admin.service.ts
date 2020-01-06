import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // DASHBOARD HOME
  getAdmin() {
    return this.http.get(`${this.API_URI}/admin`);
  }

  // DASHBOARD USUARIOS
  getUsers() {
    return this.http.get(`${this.API_URI}/admin/users`);
  }

  getUser(id: string){
    return this.http.get(`${this.API_URI}/admin/users/${id}`);
  }

  deleteUsers(id: string) {
    return this.http.delete(`${this.API_URI}/admin/users/${id}`);
  }

  updateUsers(id: string|number, updatedUser: Model.IUser): Observable<Model.IUser> {
    return this.http.put(`${this.API_URI}/admin/users/${id}`, updatedUser);
  }

  // DASHBOARD CANCHAS
  getFields(){
    return this.http.get(`${this.API_URI}/admin/fields`);
  }

  getField(id: string){
    return this.http.get(`${this.API_URI}/admin/fields/${id}`);
  }

  addFields(field: Model.IFields){
    return this.http.post(`${this.API_URI}/admin/fields`, field);
  }

  deleteFields(id: string) {
    return this.http.delete(`${this.API_URI}/admin/fields/${id}`);
  }

  updateFields(id: string|number, updatedField: Model.IFields): Observable<Model.IFields> {
    return this.http.put(`${this.API_URI}/admin/fields/${id}`, updatedField);
  }

  // DASHBOARD ARTICULOS
  getItems(){
    return this.http.get(`${this.API_URI}/admin/items`);
  }

  getItem(id: string, cod: string){
    return this.http.get(`${this.API_URI}/admin/items/${id}/${cod}`);
  }

  addItems(item: Model.IItems){
    return this.http.post(`${this.API_URI}/admin/items`, item);
  }

  deleteItems(id: string, cod: string) {
    return this.http.delete(`${this.API_URI}/admin/items/${id}/${cod}`);
  }

  updateItems(id: string|number, cod: string|number, updatedItem: Model.IItems): Observable<Model.IItems> {
    return this.http.put(`${this.API_URI}/admin/items/${id}/${cod}`, updatedItem);
  }

  // DASHBOARD ARBITROS
  getReferees(){
    return this.http.get(`${this.API_URI}/admin/referees`);
  }

  getReferee(id: string){
    return this.http.get(`${this.API_URI}/admin/referees/${id}`);
  }

  addReferees(referee: Model.IReferees){
    return this.http.post(`${this.API_URI}/admin/referees`, referee);
  }

  deleteReferees(id: string) {
    return this.http.delete(`${this.API_URI}/admin/referees/${id}`);
  }

  updateReferees(id: string|number, updatedReferee: Model.IReferees): Observable<Model.IReferees> {
    return this.http.put(`${this.API_URI}/admin/referees/${id}`, updatedReferee);
  }

  // DASHBOARD HORARIOS
  getScheds(){
    return this.http.get(`${this.API_URI}/admin/scheds`);
  }

  getSched(id: string){
    return this.http.get(`${this.API_URI}/admin/scheds/${id}`);
  }

  addScheds(sched: Model.IScheds){
    return this.http.post(`${this.API_URI}/admin/scheds`, sched);
  }

  deleteScheds(id: string) {
    return this.http.delete(`${this.API_URI}/admin/scheds/${id}`);
  }

  updateScheds(id: string|number, updatedSched: Model.IScheds): Observable<Model.IScheds> {
    return this.http.put(`${this.API_URI}/admin/scheds/${id}`, updatedSched);
  }
}
