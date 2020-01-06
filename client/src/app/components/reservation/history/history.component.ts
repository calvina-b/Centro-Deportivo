import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as Model from '../../../models/Models';
import { ReservationService } from '../../../services/reservation/reservation.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public isCollapsed: boolean[] = [];

  constructor(private reservationService: ReservationService, private title: Title) { }

  historyReservation: Model.IActiveReservation = {
    rut_cliente: parseInt(localStorage.rut),
  }

  historyReservationInfo: any = [];

  ngOnInit() {
    this.title.setTitle('Historial de reservas');
    this.getHistoryReservation();
  }

  getHistoryReservation() {
    this.reservationService.historyReservation(this.historyReservation).subscribe(
      res => {
        this.historyReservationInfo = res;
      },
      err => console.error(err)
    )
  }

}
