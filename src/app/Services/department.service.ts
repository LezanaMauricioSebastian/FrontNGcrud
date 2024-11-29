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
    
  add(model:Department):Observable<Department>{
    return this.http.post<Department>(`${this.apiURL}save`,model);
  }
  update(idDepartment:number,model:Department):Observable<Department>{
    return this.http.put<Department>(`${this.apiURL}update/${idDepartment}`,model);
  }
  delete(idDepartment:number):Observable<void>{
    return this.http.delete<void>(`${this.apiURL}delete/${idDepartment}`);
  }
  getList():Observable<Department[]>{
      return this.http.get<Department[]>(`${this.apiURL}list`);
  }

}
