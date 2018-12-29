import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export abstract class GenericService {
  private readonly headers : HttpHeaders;
  url: string;

  constructor(url: string, private httpClient: HttpClient, private authSrv : AuthService) {
    this.url = url;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authSrv.getToken()}`
    });
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`, { headers: this.headers }).pipe(map(this.extractData));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url, { headers: this.headers }).pipe(map(this.extractData));
  }

  create(obj: Object) : Observable<any> {
    return this.httpClient.post(this.url, obj,{ headers: this.headers });
  }

  update(id: any, obj: Object) : Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, obj,{ headers: this.headers });
  }

  delete(id: any) : Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`, { headers: this.headers });
  }

  private extractData(res: Response) { return res || {}; }
}
