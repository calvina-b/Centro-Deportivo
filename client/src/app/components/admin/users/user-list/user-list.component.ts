import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  usersReservations: any = [];
  usersReservationSport: any = [];
  id: any = '';

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  pageU = 1;
  pageSizeU = 5;
  collectionSizeU = 0;
  
  pageS = 1;
  pageSizeS = 5;
  collectionSizeS = 0;

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Usuarios');
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(
      res => {
        this.users = res.users;
        this.usersReservations = res.userReservation;
        this.usersReservationSport = res.userReservationSport;
        this.collectionSize = this.users.length;
        this.collectionSizeU = this.usersReservations.length;
        this.collectionSizeS = this.usersReservationSport.length;
      },
      err => console.error(err)
    );
  }

  deleteUser(id: string){
    this.adminService.deleteUsers(id).subscribe(
      res => {
        this.getUsers();
        this.flashMessage.show('Usuario eliminado correctamente', {cssClass: 'alert-danger', timeout: 3000});
      },
      err => console.error(err)
    );
  }

  openModal(content: any, id: string) {
    this.id = id;
    this.modal.open(content);
  }

  get usersPag() {
    return this.users.map((user: any, i: any) => ({id: i + 1, ...user}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  get usersReservationsPag() {
    return this.usersReservations.map((userReservation: any, i: any) => ({id: i + 1, ...userReservation}))
    .slice((this.pageU - 1) * this.pageSizeU, (this.pageU - 1) * this.pageSizeU + this.pageSizeU);
  }

  get usersReservationSportPag() {
    return this.usersReservationSport.map((userReservationSport: any, i: any) => ({id: i + 1, ...userReservationSport}))
    .slice((this.pageS - 1) * this.pageSizeS, (this.pageS - 1) * this.pageSizeS + this.pageSizeS);
  }
}
