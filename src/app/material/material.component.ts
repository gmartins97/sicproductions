import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

export interface Material {
  name: string;
  price: number;
}

const ELEMENT_DATA: Material[] = [
  { name: 'Madeira', price: 1 },
  { name: 'Ferro', price: 1.5 },
  { name: 'Plástico', price: 1.2 },
  { name: 'Pedra', price: 1.85 },
  { name: 'Vidro', price: 2 },
  { name: 'Contraplacado', price: 2.1 },
];


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  displayedColumns = ['position', 'name', 'price', 'edit', 'remove'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getMaterials(): void {
    /*this.materialSrv.getMaterials().subscribe(
      data => { this.dataSource = data; },
      error => {
        this.snackBar.open(
          "Ocorreu um erro ao tentar obter os materiais do servidor...",
          "", {
            duration: 2000,
          });
      }); */
  }

  addMaterial(): void {
    this.router.navigateByUrl('/materials/new');
  }

  editMaterial(materialIndex): void {
    //this.router.navigateByUrl('/materials/edit/' + materialIndex);
    //this.router.navigateByUrl('/materials/edit');
  }

  deleteMaterial(id: number): void {
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

