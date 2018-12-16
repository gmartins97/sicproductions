import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

export interface Category {
  description: string;
  parentDescription: string;
}

const ELEMENT_DATA: Category[] = [{ description: "Armário", parentDescription: "" }, { description: "Armário de sala", parentDescription: "Armário" }];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns = ['position', 'description', 'parent', 'edit', 'remove'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

  addCategory(): void {

  }

}
