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

  constructor(httpClient: HttpClient, authSrv: AuthService) { super('http://sicproductions.herokuapp.com/api/order', httpClient, authSrv); }

  createEncomenda(obj: order): Observable<order> {
    return super.create(obj);
  }

  getEncomendasUser(username : string): Observable<order[]> {
    return super.getById(username);
  }

  getEncomenda(username : string ,id: number): Observable<order>{
    return super.getById(username+'/'+id);
  }


  updateEncomenda(id:number, order: order): Observable<any> {
    return super.update(id, order);
  }

  deleteEncomenda(id: number): Observable<any> {
    return super.delete(id);
  }
  

}



