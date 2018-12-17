import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns = ['position', 'description', 'parent', 'edit', 'remove'];
  dataSource : MatTableDataSource<Category>;

  constructor(private router: Router, private service: CategoryService, private bar: MatSnackBar) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.service.getCategories().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter as categorias do servidor: ${error.error}`,
        '', {
          duration: 2000,
        });
    });
  }

  addCategory(): void {
    this.router.navigateByUrl("categories/new");
  }

}
