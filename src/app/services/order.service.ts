import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { order } from '../model/order';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class orderService extends GenericService{

  constructor(httpClient: HttpClient, authSrv: AuthService) { super('http://localhost:8888/api/order', httpClient, authSrv); }

  createEncomenda(obj: order): Observable<order> {
    return super.create(obj);
  }


  

}



