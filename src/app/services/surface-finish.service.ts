import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurfaceFinish } from '../model/surface-finish';
import { GenericService } from './generic.service';
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class SurfaceFinishService extends GenericService {

  constructor(httpClient: HttpClient, authSrv: AuthService) { super('https://siccatalogue.azurewebsites.net/api/surfacefinish', httpClient, authSrv); }

  createSurfaceFinish(obj: any): Observable<SurfaceFinish> {
    const sf: SurfaceFinish = new SurfaceFinish(obj.name);
    return super.create(sf);
  }

  updateSurfaceFinish(obj: SurfaceFinish) {
    return super.update(obj.id, obj);
  }

  getSurfaceFinishes(): Observable<SurfaceFinish[]> {
    return super.getAll();
  }

  getSurfaceFinish(id: number): Observable<SurfaceFinish> {
    return super.getById(id);
  }

  deleteSurfaceFinish(id: number): Observable<SurfaceFinish> {
    return super.delete(id);
  }
}
