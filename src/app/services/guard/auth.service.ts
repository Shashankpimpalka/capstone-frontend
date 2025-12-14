import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Admin } from 'src/app/admin';

@Injectable({
   providedIn: 'root'
})
export class AuthService {


   private baseURL = "http://localhost:8765/global-station-admin-service/api/v0/admin"

   constructor(private httpClient: HttpClient, private router: Router) { }

   isUserLoggedIn: boolean = false;
   userName:string='';




   public authenticate(userName: string, password: string): Observable<boolean> {
      return this.httpClient.get<any>(this.baseURL + "/auth/" + userName + "/" + password)
         .pipe(
            map((responseData: { email: any; password: any; }) => {
               if (responseData && responseData.email === userName && responseData.password === password) {
                  this.isUserLoggedIn = true;
                  localStorage.setItem('isUserLoggedIn', 'true');
                  localStorage.setItem('userName', responseData.email);
                  console.log(userName);
                  return true;
               } else {
                  this.isUserLoggedIn = false;
                  localStorage.setItem('isUserLoggedIn', 'false');
                  return false;
               }
            }),
            catchError((error: any) => {
               console.error(error);
               return throwError('User not found');
            })
         );
   }


   signUp(admin: Admin) {
      return this.httpClient.post<Admin>(this.baseURL, admin);
   }

   emailInUse(email: string) {
      return this.httpClient.get<Boolean>(this.baseURL + "/checkEmail/" + email);
   }

   login(userName: string, password: string): Observable<any> {
      console.log(userName);
      console.log(password);
      this.isUserLoggedIn = userName == 'admin' && password == 'admin';
      localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

      return of(this.isUserLoggedIn).pipe(
         delay(1000),
         tap(val => {
            console.log("Is User Authentication is successful: " + val);
         })
      );
   }

   logout(): void {
      this.isUserLoggedIn = false;
      localStorage.removeItem('isUserLoggedIn');
   }

}
