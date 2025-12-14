import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'
import { Actor } from '../actor'; 


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private baseUrl ='http://localhost:8765/global-station-actor-service/api/v0/actor'
  

  constructor(private http:HttpClient){
   
  }

  getActorsList():Observable<Actor[]>{
    return this.http.get<Actor[]>(`${this.baseUrl}`);
  }

  createActor(actor:Actor):Observable<Object>{
    return this.http.post(`${this.baseUrl}`,actor);
  }

  getActorById(actorId:number):Observable<Object>{
    return this.http.get(`${this.baseUrl}/${actorId}`);
  }

  deleteActor(actorId:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl}/${actorId}`);
  }

  updateActor(actor:Actor):Observable<Object>{
    return this.http.put(`${this.baseUrl}`,actor);
  }

}
