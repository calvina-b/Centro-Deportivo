import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as Model from '../../../models/Models';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent implements OnInit {

  reservations: any = [];
  teams: any = [];
  deleteReservation: Model.IDeleteReservation = {
    num_reserva: null
  }

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  pageT = 1;
  pageSizeT = 5;
  collectionSizeT = 0;

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Reservas');
    this.getReservations();
  }

  getReservations() {
    this.adminService.getReservations().subscribe(
      res => {
        this.reservations = res.reservation;
        this.teams = res.teams;
        this.collectionSize = this.reservations.length;
        this.collectionSizeT = this.teams.length;
      },
      err => console.error(err)
    )
  }

  get reservationPag() {
    return this.reservations.map((reservation: any, i: any) => ({id: i + 1, ...reservation}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  get teamsPag() {
    return this.teams.map((team: any, i: any) => ({id: i + 1, ...team}))
    .slice((this.pageT - 1) * this.pageSizeT, (this.pageT - 1) * this.pageSizeT + this.pageSizeT);
  }

  openModal(content: any, num_reserva: any) {
    this.deleteReservation = {
      num_reserva: num_reserva
    }
    this.modal.open(content);
  }

  deleteAdminReservation() {
    this.adminService.deleteReservation(this.deleteReservation).subscribe(
      res => {
        this.getReservations();
        this.flashMessage.show('Reserva anulada correctamente', {cssClass: 'alert-danger', timeout: 3000});
      },
      err => console.error(err) 
    )
  }
}
