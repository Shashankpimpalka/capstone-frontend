import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/guard/auth.service';
import { Admin } from '../admin';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    standalone: false
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  isEmailRegistered: boolean = false;
  admin: Admin = new Admin();

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.admin = new Admin();

    this.registrationForm = this.fb.group({
      adminId: [],
      firstName: ['test admin', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      lastName: ['Last name admin', [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')]],
      password: ['pass', Validators.required],
      email: ['test2@user', [Validators.required, Validators.email]],
      phone: ['12345678', [Validators.required]]
    });
  }


  onSubmit() {
    console.log("OnSubmit")
    console.log("Form Valid?", this.registrationForm.valid);

    console.log("Form value ", this.admin);
    if (this.registrationForm.valid) {
      console.log("Ifblock")
      // const email = this.registrationForm.get('email')?.value;
      const email = this.admin.email;

      console.log(email)
      // this.admin.email = email;
      this.authService.emailInUse(email).subscribe((result) => {
        console.log(result)
        if (!result) {
          console.log("Ifblock2")
          this.authService.signUp(this.admin).subscribe((response) => {
            alert('Registration successful Please login');
            this.router.navigate(['']);
          });
        } else {
          console.log("else2")
          this.registrationForm.get('email')?.setErrors({ emailExists: true });
        }
      },
      (error)=>{
        console.log("error message"+error)
        if (error instanceof HttpErrorResponse){
          if (error.status === 400) {
            alert('email is alreadry exitst');
            return;
        } 
        }
      });
    } else {
      console.log("else1")
      this.markFormGroupTouched(this.registrationForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
