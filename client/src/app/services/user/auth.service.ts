import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // LOGIN
  logIn(user: Model.IUser){
    return this.http.post(`${this.API_URI}/auth`, user, {observe : 'response'}).pipe(
        map(res => {
          localStorage.setItem('auth-token', res.headers.get('auth-token'));
          return res.body;
        }
      )
    )
  }

  // REGISTER
  logUp(user: Model.IUser){
    return this.http.post(`${this.API_URI}/auth/register`, user, {observe : 'response'}).pipe(
        map(res => {
          localStorage.setItem('auth-token', res.headers.get('auth-token'));
          return res.body;
        }
      )
    )
  }
  
  // LOGOUT
  logOut(){
    localStorage.removeItem('auth-token');
    localStorage.removeItem('name');
    localStorage.removeItem('acc');
    localStorage.removeItem('rut');
  }
}
