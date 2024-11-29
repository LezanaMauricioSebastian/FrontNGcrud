import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../Interfaces/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
 
  private endpoint:string=environment.endPoint;
  private apiURL:string=this.endpoint+"employee/";
  constructor(private http:HttpClient) { 
    //console.log(environment.endPoint);
    
  
   
  }

    
  getList():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiURL}list`);
  }
  add(model:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiURL}save`,model);
  }
  update(idEmployee:number,model:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiURL}update/${idEmployee}`,model);
  }
  delete(idEmployee:number):Observable<void>{
    return this.http.delete<void>(`${this.apiURL}delete/${idEmployee}`);
  }
}
