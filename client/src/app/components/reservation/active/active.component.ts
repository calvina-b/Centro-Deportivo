import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';

import * as Model from '../../../models/Models';
import { ReservationService } from '../../../services/reservation/reservation.service';


@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  public isCollapsed: boolean[] = [];

  constructor(private reservationService: ReservationService, private title: Title, private modal: NgbModal, private flashMessage: FlashMessagesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  activeReservation: Model.IActiveReservation = {
    rut_cliente: parseInt(localStorage.rut),
  }

  activeReservationInfo: any = [];

  deleteReservation: Model.IDeleteReservation = {
    num_reserva: null
  }

  ngOnInit() {
    this.title.setTitle('Reservas activas');
    this.getActiveReservation();
  }

  getActiveReservation() {
    this.reservationService.activeReservation(this.activeReservation).subscribe(
      res => {
        this.activeReservationInfo = res;
      },
      err => console.error(err)
    )
  }

  openModal(content: any, num_reserva: any) {
    this.deleteReservation = {
      num_reserva: num_reserva
    }
    this.modal.open(content);
  }

  deleteActiveReservation() {
    this.reservationService.deleteReservation(this.deleteReservation).subscribe(
      res => {
        this.router.navigate(['/active']).then(()=>  {window.location.reload();});
      },
      err => console.error(err) 
    )
  }

}
