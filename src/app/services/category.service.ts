import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Observable} from "rxjs";
import {Category} from "../model/category";
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GenericService {

  constructor(httpClient: HttpClient) { super('https://siccatalogue.azurewebsites.net/api/category', httpClient);}

  getCategories(): Observable<any> {
    return super.getAll();
  }

  createCategory(category: Category) : Observable<any> {
    return super.create(category);
  }

  updateCategory(id: number, category: Category) : Observable<any> {
    return super.update(id, category);
  }

  deleteCategory(id: number) : Observable<any> {
    return super.delete(id);
  }
}
