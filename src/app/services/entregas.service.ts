import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { city } from '../model/city';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {
 
  private readonly headers : HttpHeaders;
  
  cidades : city[];

  constructor(private httpClient: HttpClient, authSrv : AuthService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpClient.get('https://api.myjson.com/bins/17c5e8').subscribe(data => {
      this.cidades=<city[]>data;
    });
   }

  getEntregas():Observable<any> {

    return this.httpClient.post('http://ec2-18-220-175-183.us-east-2.compute.amazonaws.com:4000/api/CalculateDeliveriesPath',this.cidades,{ headers: this.headers });
    
  }


}