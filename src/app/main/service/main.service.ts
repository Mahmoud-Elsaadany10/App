import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { products } from '../../Modules/Product';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpcln : HttpClient) {

  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Add authorization token if needed
    }),
  };
  isToggle = new BehaviorSubject<boolean>(true);

  IsToggleCurrent = this.isToggle.asObservable()

  changToggle(toggle : boolean){
    this.isToggle.next(toggle)
  }

  allProduct():Observable<any>{
      return this.httpcln.get<any>(`${environment.ApiUrl}/products`)
  }
  getCategories():Observable<any>{
    return  this.httpcln.get<any>(`${environment.ApiUrl}/categories`)
  }
  getProductByCatId(CatId :number):Observable<any>{
    return this.httpcln.get<any>(`${environment.ApiUrl}/products/?categoryId=${CatId}`)
  }
  getCheapestProduct():Observable<any>{
    return this.httpcln.get<any>(`${environment.ApiUrl}/products/?price_min=10&price_max=30`)
  }
  getFilteredProducts(
    CatId?: number ,
    minPrice?: number,
    maxPrice?: number
  ): Observable<any> {
    let params = new HttpParams();

    if (CatId) {
      params = params.append('categoryId', CatId.toString());
    }

    if (minPrice) {
      params = params.append('price_min', minPrice.toString());
    }

    if (maxPrice) {
      params = params.append('price_max', maxPrice.toString());
    }

    return this.httpcln.get<any>(`${environment.ApiUrl}/products`, { params });
  }

  getSingleProduct(PrdId: number): Observable<any> {
    return this.httpcln.get(`${environment.ApiUrl}/products/${PrdId}`);
  }
  postData(data: any): Observable<any> {
    return this.httpcln.post(`http://localhost:3000/products`, data , this.httpOptions);
  }
  getUserById(id :number):Observable<any>{
    return this.httpcln.get(`https://dummyjson.com/users/${id}`)
  }
  updateUserInfo(data :any):Observable<any>{
    return this.httpcln.put<any>(`https://dummyjson.com/users/${data.id}` ,data )
  }

}
