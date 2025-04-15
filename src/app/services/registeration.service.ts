import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {
  private API_URL = 'https://dummyjson.com/auth';
  private LOCAL_API_URL = 'http://localhost:8000';

  userData = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.saveUser();
    }
  }

  // ✅ Save User Data from Token
  private saveUser() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userData.next(decodedToken);
        console.log('Decoded User Data:', decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        this.logout();
      }
    }
  }

  // ✅ Login User
  login(data: { username: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/login`, data).pipe(
      map((response: any) => {
        if (response.accessToken && response.refreshToken) {
          this.setTokens(response.accessToken, response.refreshToken);
          this.saveUser();
        }
        return response;
      })
    );
  }

  // ✅ Register User
  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.LOCAL_API_URL}/signup`, user)
  }

  // ✅ Logout User
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('cart');
    this.userData.next(null);
    this.router.navigate(['/user/login']);
  }

  // ✅ Set Tokens
  private setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }


  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // ✅ Check if Token is Expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Token decoding error:', error);
      return true;
    }
  }

  // ✅ Refresh Token
  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token found.'));
    }

    return this.httpClient.post(`${this.API_URL}/refresh`, { refreshToken }).pipe(
      map((response: any) => {
        if (response.accessToken) {
          this.setTokens(response.accessToken, response.refreshToken);
          return response.accessToken;
        } else {
          this.logout();
          return throwError(() => new Error('Failed to refresh token.'));
        }
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => new Error('Refresh token expired. Please log in again.'));
      })
    );
  }

  // ✅ Get All Users (Example API Request)
  getUsers(): Observable<any> {
    return this.httpClient.get(`${this.LOCAL_API_URL}/users`)
  }


}
