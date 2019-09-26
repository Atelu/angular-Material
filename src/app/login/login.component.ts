import { first, delay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../Utilities/authorization.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  value = 50;
  submitted = false;
  loginform: FormGroup;
  invalidPassword = false;
  invalidUsername = false;
  loading = false;
  constructor(private authorizationService: AuthorizationService,
              private fb: FormBuilder, private router: Router) {

    // redirect to home if already logged in
    if (this.authorizationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });

  }
 // convenience getter for easy access to form fields
 get f() { return this.loginform.controls; }

 onSubmit() {
   this.invalidPassword = false;
   this.submitted = true;
   this.loading = true;

   // reset alerts on submit
   // this.alertService.clear();

   if (this.loginform.invalid) {
     // this.invalidPassword = true;

     return;
   }

   this.authorizationService.login(this.f.username.value, this.f.password.value)
     .pipe(
       first(),
       delay(2000),
     )
     .subscribe(
       data => {
         this.router.navigate(['/dashboard']);
         this.loading = true;
       },
       (error: any) => {
         console.log('err', error);
         if (error instanceof HttpErrorResponse) {
           console.log(error.status);
           if (error.status === 401 || error.status === 403) {

             // invalid username or password
              this.invalidPassword = true;
           }
         }

         this.loading = true;
       });
     }
}
