import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Material} from "../model/Material";
import {SurfaceFinish} from "../model/surface-finish";

export interface MaterialFinish {
  material: Material;
  finish : SurfaceFinish;
  increment: number;
  texture: string;
}

const mat1 = new Material("Madeira", 3.89);
const finish1 = new SurfaceFinish("Serrado");
const increment1 = 3.11;
const texture1 = "https://www.sharecg.com/images/medium/24765.jpg";
const mat2 = new Material("Granito", 60.5);
const finish2 = new SurfaceFinish("Polido");
const increment2 = 5.5;
const texture2 = "https://i.pinimg.com/736x/65/ac/06/65ac0600e9c46d59f14e58e1200acff3--granite-brazil.jpg";

const MaterialFinishes: MaterialFinish[] = [{material: mat1, finish: finish1, increment: increment1, texture: texture1},
  {material: mat2, finish: finish2, increment: increment2, texture: texture2}];

@Component({
  selector: 'app-material-finish',
  templateUrl: './material-finish.component.html',
  styleUrls: ['./material-finish.component.css']
})
export class MaterialFinishComponent implements OnInit {
  displayedColumns = ['position', 'materialName','finishName','increment', 'totalPrice', 'texture', 'edit', 'remove'];
  dataSource = new MatTableDataSource(MaterialFinishes);

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
