import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';

import { AdminService } from '../../../../services/admin/admin.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: any = []

  constructor(private adminService: AdminService, private flashMessage: FlashMessagesService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Articulos');
    this.getItems();
  }

  getItems(){
    this.adminService.getItems().subscribe(
      res => {
        this.items = res;
      },
      err => console.error(err)
    )
  }

  deleteItem(id: string){
    this.adminService.deleteItems(id).subscribe(
      res => {
        this.getItems();
        this.flashMessage.show('Articulo eliminado correctamente', {cssClass: 'alert-danger', timeout: 3000});
      },
      err => console.error(err)
    )
  }

}
