import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurfaceFinish } from '../model/surface-finish';


@Injectable({
  providedIn: 'root'
})
export class SurfaceFinishService {

  private url = 'https://siccatalogue.azurewebsites.net/api/surfacefinish';

  constructor(private http: HttpClient) {
  }

  createSurfaceFinish(obj: any): Observable<SurfaceFinish> {
    const sf: SurfaceFinish = new SurfaceFinish(obj.name);
    return this.http.post<SurfaceFinish>(this.url, sf);
  }

  updateSurfaceFinish(obj: SurfaceFinish) {
    return this.http.put(this.url + `/${obj.id}`, obj);
  }

  getSurfaceFinishes(): Observable<SurfaceFinish[]> {
    return this.http.get<SurfaceFinish[]>(this.url);
  }

  getSurfaceFinish(id: number): Observable<SurfaceFinish> {
    return this.http.get<SurfaceFinish>(this.url + `/${id}`);
  }

  deleteSurfaceFinish(id: number): Observable<SurfaceFinish> {
    return this.http.delete<SurfaceFinish>(this.url + `/${id}`);
  }
}
