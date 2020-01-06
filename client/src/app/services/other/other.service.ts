import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  fields(){
    return this.http.get(`${this.API_URI}/fields`);
  }

  fieldInfo(sport: Model.IFieldInfo){
    return this.http.post(`${this.API_URI}/fields`, sport);
  } 
}
