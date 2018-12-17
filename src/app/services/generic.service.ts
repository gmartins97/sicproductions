import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export abstract class GenericService {
  url: string;

  constructor(url: string, private httpClient: HttpClient) {
    this.url = url;
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(this.extractData));
  }

  create(obj: Object) : Observable<any> {
    return this.httpClient.post(this.url, obj);
  }

  update(id: any, obj: Object) : Observable<any> {
    return this.httpClient.put(this.url + '/' + id, obj);
  }

  delete(id: any) : Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  private extractData(res: Response) { return res || {}; }
}
