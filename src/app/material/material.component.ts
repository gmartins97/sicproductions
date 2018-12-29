import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Material } from '../model/Material';
import { MaterialService } from '../services/material.service';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  displayedColumns = ['position', 'name', 'price', 'edit', 'remove'];
  dataSource = new MatTableDataSource<Material>();
  materials: Material[];

  constructor(private router: Router, private service: MaterialService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getMaterials();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getMaterials(): void {
    this.service.getMaterials().subscribe(data => {
      this.materials = <Material[]>data;
      this.dataSource = new MatTableDataSource(this.materials);
    }, error => {
      if(error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          'Ocorreu um erro ao tentar obter os materiais do servidor...',
          '', {
            duration: 2000,
          });
      }
    });
  }

  addMaterial(): void {
    this.router.navigateByUrl('/materials/new');
  }

  editMaterial(index: number): void {
    let id = this.materials[index].id;
    this.router.navigateByUrl("materials/edit/" + id);
  }

  deleteMaterial(index: number): void {
    this.service.deleteMaterial(this.materials[index].id).subscribe(
      m => {
        this.bar.open(`Material ${m.name} removido com sucesso`, '', { duration: 2000 });
        this.getMaterials();
      },
      e => {
        this.bar.open('Ocorreu um erro: ' + e.error, '', { duration: 2000 });
      });
  }

}

