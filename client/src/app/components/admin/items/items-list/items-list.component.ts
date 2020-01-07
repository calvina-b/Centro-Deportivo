import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: any = [];
  id: any = '';
  cod: any = '';

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title, private modal: NgbModal) { }

  ngOnInit() {
    this.title.setTitle('Articulos');
    this.getItems();
  }

  getItems(){
    this.adminService.getItems().subscribe(
      res => {
        this.items = res;
        this.collectionSize = this.items.length;
      },
      err => console.error(err)
    )
  }

  deleteItem(id: string, cod: string){
    this.adminService.deleteItems(id, cod).subscribe(
      res => {
        this.getItems();
        this.flashMessage.show('Articulo eliminado correctamente', {cssClass: 'alert-danger', timeout: 3000});
      },
      err => console.error(err)
    )
  }

  openModal(content: any, id: string, cod: string) {
    this.id = id;
    this.cod = cod;
    this.modal.open(content);
  }

  get itemsPag() {
    return this.items.map((item: any, i: any) => ({id: i + 1, ...item}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
