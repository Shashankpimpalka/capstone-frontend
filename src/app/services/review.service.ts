import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseURL = "http://localhost:8765/global-station-review-service/api/v0/review"

  constructor(private httpClient:HttpClient) { }

  getReviewList(): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.baseURL}`);
  }

  deleteReview(reviewId:number):Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/${reviewId}`);
  }

  saveReview(review:Review):Observable<any>{
    return this.httpClient.post(`${this.baseURL}`,review)
  }

  getReviewById(reviewId:number):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/${reviewId}`);
  }

  updateReview(review:Review):Observable<any>{
    
    return this.httpClient.put(`${this.baseURL}`,review);

  }

}
