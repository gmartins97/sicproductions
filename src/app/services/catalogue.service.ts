import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { Catalogue } from '../model/catalogue';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService extends GenericService {

  constructor(httpClient: HttpClient, authSrv: AuthService) { super('https://siccatalogue.azurewebsites.net/api/catalogue', httpClient, authSrv); }

  getCatalogues(): Observable<any> {
    console.log(localStorage.getItem("access_token"));
    return super.getAll();
  }

  getCatalogue(id: number): Observable<Catalogue> {
    return super.getById(id);
  }


  createCatalogue(catalogue: Catalogue): Observable<any> {
    return super.create(catalogue);
  }

  updateCatalogue(id: number, catalogue: Catalogue): Observable<any> {
    return super.update(id, catalogue);
  }

  deleteCatalogue(id: number): Observable<any> {
    return super.delete(id);
  }
}
