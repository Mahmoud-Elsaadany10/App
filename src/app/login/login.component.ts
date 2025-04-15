import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterationService } from '../services/registeration.service';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, NgbToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm!: FormGroup;
    iClick = false;
    errorMessage = '';
    isloading = false;


    constructor(
      private fbulider: FormBuilder,
      private _auth: RegisterationService,
      private router: Router
    ) {
      this.loginForm = this.fbulider.group({
        username: ['', [Validators.required]], // Changed from 'Email' to 'username'
        password: ['', Validators.required] // Changed from 'Password' to 'password'
      });
    }

    get username() {
      return this.loginForm.get('username'); // Changed from 'Email' to 'username'
    }

    get password() {
      return this.loginForm.get('password'); // Changed from 'Password' to 'password'
    }

    login() {
      if (this.loginForm.invalid) {
        return;
      }

      const logUser = { ...this.loginForm.value };
      this.isloading = true;

      this._auth.login(logUser).subscribe({
        next: (response) => {
          if (response.accessToken) { // ✅ Check for token, not password
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('role', "user");
            // this._auth.saveUser();
            this.router.navigate(['user/home']);
            this.isloading = false
          }
        },error:()=>{
          this.isloading =false
        }
      });

    }


    iconClick(ele: HTMLElement) {
      this.iClick = !this.iClick;
      ele.getAttribute('type') === 'password'
        ? ele.setAttribute('type', 'text')
        : ele.setAttribute('type', 'password');
    }
  }


