import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  API_URI = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }

  getSports(){
    return this.http.get(`${this.API_URI}/reservation`);
  }

  postItemsAndReferee(id: Model.IItemsAndReferee){
    return this.http.post<any>(`${this.API_URI}/reservation/itemsAndReferee`, id);
  }

  reservation(reservation: Model.IReservation){
    return this.http.post(`${this.API_URI}/reservation`, reservation);
  }

  newReservation(reservation: Model.INewReservation, teamA: Model.ITeam, teamB: Model.ITeam){
    return this.http.post(`${this.API_URI}/reservation/new`, [reservation, teamA, teamB]);
  }

  activeReservation(id: Model.IActiveReservation){
    return this.http.post(`${this.API_URI}/reservation/active`, id);
  }

  deleteReservation(id: Model.IDeleteReservation) {
    return this.http.post(`${this.API_URI}/reservation/active/delete`, id);
  }

  historyReservation(id: Model.IActiveReservation){
    return this.http.post(`${this.API_URI}/reservation/history`, id);
  }
}
