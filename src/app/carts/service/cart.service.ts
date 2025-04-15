import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpcl : HttpClient) { }

  sendDataToApi(data:any) :Observable<any>{
    return this.httpcl.post(`${environment.ApiUrl}/products`,data)
  }
}
