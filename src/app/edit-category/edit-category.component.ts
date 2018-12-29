import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../services/category.service";
import {MatSnackBar} from "@angular/material";
import { Category } from '../model/category';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categories: Category[];
  categoryDescription: string = "";
  parentCategoryId: number;
  id: number;
  constructor(private router: Router,private route: ActivatedRoute, private service: CategoryService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.route.params.subscribe(res => {
      this.id = <number>res.id;
    });
    this.service.getCategories().subscribe(data => {
      let category = (<Category[]>data).find(cat => cat.id == this.id);
      this.parentCategoryId = category.parentId;
      this.categoryDescription = category.description;
      this.categories = (<Category[]>data).filter(cat => cat.id != this.id);
    }, error => {
      if(error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar obter as categorias do servidor...`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  confirm(): void {
    if (this.categoryDescription.trim().length == 0) {
      this.bar.open(
        `Descrição da categoria não pode ser vazia.`,
        '', {
          duration: 2000,
        });
      return;
    }

    let cat: Category = {id: this.id, description: this.categoryDescription, parentId: this.parentCategoryId};
    this.service.updateCategory(this.id, cat).subscribe(() => {
      this.bar.open(
        `Sucesso: a categoria foi editada.`,
        '', {
          duration: 2000,
        });
      this.back();
    }, error => {
      if(error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Erro: ${error.error}`,
          '', {
            duration: 2000,
          });
      }

    });
  }

  back(): void {
    this.router.navigateByUrl("/categories");
  }

}
