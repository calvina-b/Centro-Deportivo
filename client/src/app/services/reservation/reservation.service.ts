import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  API_URI = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }

  Reservation(reservation: Model.IReservation){
    return this.http.post(`${this.API_URI}/reservation`, reservation);
  }

  newReservation(reservation: Model.INewReservation, teamA: Model.ITeam, teamB: Model.ITeam){
    return this.http.post(`${this.API_URI}/reservation/new`, [reservation, teamA, teamB]);
  }

}
