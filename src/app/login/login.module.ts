import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';


import { LoginRoutingModule } from './login-routing.module';
import {
  MatFormFieldModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule,
  MatInputModule, MatButtonModule
} from '@angular/material/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, MatProgressBarModule,
    LoginRoutingModule, MatFormFieldModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule,
    MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule,
  ]
})
export class LoginModule { }
