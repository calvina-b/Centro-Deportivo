import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  acc: string
    
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.acc = this.readAccValue('acc');
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  get name(): any {
    return localStorage.getItem('name');
  }

  readAccValue(key: string) {
    return localStorage.getItem(key);
  }
}
