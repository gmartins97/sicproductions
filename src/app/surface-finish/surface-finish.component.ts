import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface SurfaceFinish {
  name: string;
  price: number;
}

const ELEMENT_DATA: SurfaceFinish[] = [
  { name: 'Polido', price: 1 },
  { name: 'Amaciado', price: 1.5 },
  { name: 'Serrado', price: 1.2 },
  { name: 'Cortado', price: 1.85 },
  { name: 'Envernizado', price: 2 },
  { name: 'Verniz brilhante', price: 2.1 },
  { name: 'Baço', price: 0.80 },
  { name: 'Verniz baço', price: 1.90 },
  { name: 'Areado', price: 1.90 },
  { name: 'Areado v2', price: 1.92 },
  { name: 'Areado v3', price: 1.95 }
];

@Component({
  selector: 'app-surface-finish',
  templateUrl: './surface-finish.component.html',
  styleUrls: ['./surface-finish.component.css']
})
export class SurfaceFinishComponent implements OnInit {
  displayedColumns = ['position', 'name', 'price', 'edit', 'remove'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getSurfaceFinishes(): void {
    /*this.surfaceFinishSrv.getSurfaceFinishes().subscribe(
      data => { this.dataSource = data; },
      error => {
        this.snackBar.open(
          "Ocorreu um erro ao tentar obter os acabamentos do servidor...",
          "", {
            duration: 2000,
          });
      }); */
  }

  deleteSurfaceFinish(id: number): void {
    /*this.surfaceFinishSrv.deleteSurfaceFinish(id).subscribe(
      sf => {
        this.snackBar.open("Acabamento " + sf.name + " removido com sucesso",
          "", {
            duration: 1500,
          });
        this.getSurfaceFinishes();
      },
      error => {
        this.snackBar.open("Ocorreu um erro: " + error.error, "", {
          duration: 2000,
        });
      }); */
  }

}
