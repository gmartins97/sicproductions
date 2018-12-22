import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../model/Material';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends GenericService{

  constructor(httpClient: HttpClient) { super('https://siccatalogue.azurewebsites.net/api/Material', httpClient); }

  getMaterials(): Observable<any> {
    return super.getAll();
  }

  createMaterial(material: Material): Observable<any> {
    return super.create(material);
  }

  updateMaterial(id: number, material: Material): Observable<any> {
    return super.update(id, material);
  }

  deleteMaterial(id: number): Observable<any> {
    return super.delete(id);
  }
  
}
