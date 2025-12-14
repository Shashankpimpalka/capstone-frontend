import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseURL = "http://localhost:8765/global-station-movie-service/api/v0/movie"
  constructor(private httpClient:HttpClient) { }

  getMovieList():Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.baseURL}`);
  }

  getMovieById(movieId:number):Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${movieId}`);
  }
  deleteMovie(movieId:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${movieId}`);
  }
  saveMovie(movie:Movie):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,movie);
  }

  updateMovie(movie:Movie):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}`,movie);
  }

  serchMovie(movieTitle:string):Observable<any>{
    const url = this.baseURL +"/byname/" +movieTitle
    console.log(url)
   return this.httpClient.get(this.baseURL +"/byname/" +movieTitle);
  }


} 
