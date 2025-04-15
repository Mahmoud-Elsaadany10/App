import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ServicesService } from '../service/main.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private _profile: ServicesService ,
    _activatedRoute :ActivatedRoute
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      age: ['']
    });
  }

  setUserId(){

  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decodedToken: any = jwtDecode(token);
      const id = decodedToken.id

      this._profile.getUserById(id).subscribe({
        next: (userData) => {
          this.profileForm.patchValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            age: userData.age
          });
          console.log(userData)
        },
        error: (err) => console.error('Error fetching user data:', err)
      });
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  sendToApi() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const decodedToken: any = jwtDecode(token);
    const id = decodedToken.id
    const updatedInfo = {id , ...this.profileForm.value}
    this._profile.updateUserInfo( updatedInfo).subscribe(
      {
        next:()=>{
          console.log(updatedInfo)
        }
      }
    )
  }
}
