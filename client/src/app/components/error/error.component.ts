import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private location: Location, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Oops!');
  }

  backClick() {
    this.location.back();
  }

}
