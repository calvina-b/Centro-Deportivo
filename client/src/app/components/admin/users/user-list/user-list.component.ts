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
  id: any = '';

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Usuarios');
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(this.users)
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
}
