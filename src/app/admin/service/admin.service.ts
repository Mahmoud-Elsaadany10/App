import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // private token: string | null = localStorage.getItem("Token");

  constructor(private _httpclient: HttpClient) {}

  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.token ? this.token : ''}`
  //     })
  //   };
  // }

  getAllUsers(): Observable<any> {
    return this._httpclient.get("https://dummyjson.com/users"); // ✅ Call method to get headers
  }
  getUsersByPage(skip: number, limit: number): Observable<any> {
    return this._httpclient.get(`https://dummyjson.com/users?skip=${skip}&limit=${limit}`);
  }

  searchByName(name: string): Observable<any> {
    return this._httpclient.get(`https://dummyjson.com/users/search?q=${name}`);
  }
}
