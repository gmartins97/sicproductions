import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialFinish } from '../model/material-finish';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MaterialFinishService {

  private url = 'https://siccatalogue.azurewebsites.net/api/materialfinish';

  constructor(private http: HttpClient) { }

  createMaterialFinish(obj: MaterialFinish): Observable<MaterialFinish> {

    const mf = {
      materialDTO: {
        id: obj.material.id
      },
      surfaceFinishDTO: {
        id: obj.surface.id
      },
      price: obj.price
    };

    return this.http.post<MaterialFinish>(this.url, mf);
  }

  updateMaterialFinish(obj: MaterialFinish) {
    const mf = {
      id: obj.id,
      materialDTO: {
        id: obj.material.id
      },
      surfaceFinishDTO: {
        id: obj.surface.id
      },
      price: obj.price
    };

    return this.http.put(this.url + `/${mf.id}`, mf);
  }

  getMaterialFinishes(): Observable<MaterialFinish[]> {
    return this.http.get<MaterialFinish[]>(this.url);
  }

  getMaterialFinish(id: number): Observable<MaterialFinish> {
    return this.http.get<MaterialFinish>(this.url + `/${id}`);
  }

  deleteMaterialFinish(id: number): Observable<MaterialFinish> {
    return this.http.delete<MaterialFinish>(this.url + `/${id}`);
  }
}
