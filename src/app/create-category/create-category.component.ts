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
  categoryDescription: string;
  parentCategoryId: number;
  constructor(private router: Router, private bar: MatSnackBar, private service: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.service.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter as categorias do servidor: ${error.error}`,
        '', {
          duration: 2000,
        });
    });
  }

  confirm(): void {
    let cat = new Category(this.categoryDescription, this.parentCategoryId);
    this.service.createCategory(cat).subscribe(cat => {
      this.bar.open(
        `Sucesso: a categoria foi criada.`,
        '', {
          duration: 2000,
        });
      this.back();
    }, error => {
      this.bar.open(
        `Erro: ${error.error}`,
        '', {
          duration: 2000,
        });
    });
  }

  back(): void {
    this.router.navigateByUrl('/categories');
  }

}
