import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Category} from "../model/category";
import {MaterialFinish} from "../material-finish/material-finish.component";
import {Material} from "../model/Material";
import {SurfaceFinish} from "../model/surface-finish";

export interface Dimension {

}

export interface ContinuousDimension extends Dimension {
  min: number;
  max: number;
}

export interface DiscreteDimension extends Dimension{
  values: number[];
}

export interface Dimensions {
  width: Dimension;
  height: Dimension;
  depth: Dimension;
}

export interface Product {
  id?: number;
  name: string;
  category: Category;
  materialFinishes: MaterialFinish[];
  dimensions: Dimensions;
  parts: Product[];
  minOccupancyPercentage: number;
  maxOccupancyPercentage: number;
}

const name1 = "Armário XPTO";
const name2 = "Armário XYZ";
const category1 = new Category("Armário", 0);
const mat1 = new Material("Madeira", 3.89);
const finish1 = new SurfaceFinish("Serrado");
const increment1 = 3.11;
const texture1 = "https://www.sharecg.com/images/medium/24765.jpg";
const materialFinishes1 = [{material: mat1, finish: finish1, increment: increment1, texture: texture1}];
const dim1 : Dimension = {min: 150, max: 300};
const dimensions1 : Dimensions = {width: dim1, height: dim1, depth: dim1};
const minOccupancyPercentage1 = 0;
const maxOccupancyPercentage1 = 100;
const prod1 : Product = {name: name1, category: category1, materialFinishes: materialFinishes1, dimensions: dimensions1, parts: [], minOccupancyPercentage: minOccupancyPercentage1, maxOccupancyPercentage: maxOccupancyPercentage1};
const prod2 : Product = {name: name2, category: category1, materialFinishes: materialFinishes1, dimensions: dimensions1, parts: [], minOccupancyPercentage: minOccupancyPercentage1, maxOccupancyPercentage: maxOccupancyPercentage1};



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'info'];
  products: Product[] = [prod1, prod2];
  dataSource = new MatTableDataSource(this.products);

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
