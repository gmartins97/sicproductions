import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import { Category } from '../model/category';
import {CategoryService} from "../services/category.service";
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categories: Category[];
  categoryDescription: string = "";
  parentCategoryId: number;
  constructor(private router: Router, private bar: MatSnackBar, private service: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.service.getCategories().subscribe(data => {
      this.categories = data;
      this.parentCategoryId = 0;
    }, error => {
      if(error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          'Ocorreu um erro ao tentar obter as categorias do servidor...',
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


    let cat = new Category(this.categoryDescription, this.parentCategoryId);
    this.service.createCategory(cat).subscribe(cat => {
      this.bar.open(
        `Sucesso: a categoria foi criada.`,
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
    this.router.navigateByUrl('/categories');
  }

}
