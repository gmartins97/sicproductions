import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { AuthService } from './auth.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericService{

  constructor(httpClient: HttpClient, authSrv: AuthService) { super('https://siccatalogue.azurewebsites.net/api/product', httpClient, authSrv); }

  getProducts(): Observable<any> {
    return super.getAll();
  }

  getProduct(id: number): Observable<Product>{
    return super.getById(id);
  }

  createProduct(product: Product): Observable<Product> {
    return super.create(product);
  }

  updateProduct(id:number, product: Product): Observable<any> {
    return super.update(id, product);
  }

  deleteProduct(id: number): Observable<any> {
    return super.delete(id);
  }



}
