import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialFinish } from '../model/material-finish';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MaterialFinishService extends GenericService{


  constructor(httpClient: HttpClient, authSrv: AuthService) { super('https://siccatalogue.azurewebsites.net/api/materialfinish', httpClient, authSrv); }

  createMaterialFinish(obj: MaterialFinish): Observable<MaterialFinish> {

    const mf = {
      materialDTO: {
        id: obj.material.id
      },
      surfaceFinishDTO: {
        id: obj.surface.id
      },
      price: obj.price,
      textureUrl: obj.textureUrl
    };

    return super.create(mf);
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
      price: obj.price,
      textureUrl: obj.textureUrl
    };

    return super.update(mf.id, mf);
  }

  getMaterialFinishes(): Observable<MaterialFinish[]> {
    return super.getAll();
  }

  getMaterialFinish(id: number): Observable<MaterialFinish> {
    return super.getById(id);
  }

  deleteMaterialFinish(id: number): Observable<MaterialFinish> {
    return super.delete(id);
  }
}
