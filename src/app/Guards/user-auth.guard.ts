import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['user/login']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken.gender;

      if (userRole === 'female') {
        return true; // allow "customer"
      } else {
        this.router.navigate(['user/login']); // prevent customer"
        return false;
      }
    } catch (error) {
      console.error('error ', error);
      this.router.navigate(['user/login']);
      return false;
    }
  }
}
