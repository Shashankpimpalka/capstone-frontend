import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Admin } from '../admin';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL = "http://localhost:8765/global-station-admin-service/api/v0/admin"

  constructor(private httpClient:HttpClient) { }

  getAdminList(): Observable<Admin[]>{
    return this.httpClient.get<Admin[]>(`${this.baseURL}`);
  }

  createAdmin(admin: any) {
    return this.httpClient.post(`${this.baseURL}`, admin);
  }

  deleteAdmin(adminId:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${adminId}`)
  }


}
