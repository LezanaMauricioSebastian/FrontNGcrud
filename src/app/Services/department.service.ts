import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Department } from '../Interfaces/department';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private endpoint:string=environment.endPoint;
  private apiURL:string = `${this.endpoint}department/`;
  
  constructor(private http:HttpClient) {}
    
  
  getList():Observable<Department[]>{
      console.log(this.http.get<Department[]>(`${this.apiURL}list`));
      return this.http.get<Department[]>(`${this.apiURL}list`);
  }

}
