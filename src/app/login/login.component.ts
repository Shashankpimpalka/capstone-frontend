import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/guard/auth.service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName!: string;
  password!: string;
  formData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }
  get f() { return this.formData.controls; }

  ngOnInit(): void {
    this.formData = new FormGroup({
      userName: new FormControl("shashank@gmail.com"),
      password: new FormControl("pass"),
    });

  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    console.log("1 Login page: " + this.userName);
    console.log("2 Login page: " + this.password);

    this.authService.authenticate(this.userName, this.password).subscribe({
      next: isLoggedIn => {
        this.formData.reset;
        console.log('User is logged in:', isLoggedIn);
        this.router.navigate(['/movie']);
      },
      error: error => {
        alert("Invalid Email or Password")
        console.error('Authentication error:', error);
      }
    });


    // this.authService.authenticationAdmin(this.userName, this.password).subscribe( {
    //   next:(data: any)=>{
    //     console.log("loginmech")
    //     this.formData.reset;
    //     console.log("Is Login Success: " + data); 

    //    if(data) this.router.navigate(['/movie']); }
    // });


  }



}
