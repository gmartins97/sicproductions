import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Material } from "../model/Material";
import { SurfaceFinish } from "../model/surface-finish";
import { Router } from '@angular/router';
import { MaterialFinishService } from '../services/material-finish.service';
import { MaterialFinish } from '../model/material-finish';


@Component({
  selector: 'app-material-finish',
  templateUrl: './material-finish.component.html',
  styleUrls: ['./material-finish.component.css']
})
export class MaterialFinishComponent implements OnInit {
  materialFinishes: MaterialFinish[]
  displayedColumns = ['position', 'materialName', 'finishName', 'increment', 'totalPrice', 'texture', 'edit', 'remove'];
  dataSource = new MatTableDataSource(this.materialFinishes);

  constructor(private router: Router, private service: MaterialFinishService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getMaterialFinishes();
  }

  private getMaterialFinishes(): void {
    this.service.getMaterialFinishes().subscribe(data => {
      this.materialFinishes = <MaterialFinish[]>data;
      this.dataSource.data = this.materialFinishes;
    }, e => {
      if(e.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar obter os materiais-acabamentos do servidor...`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMaterialFinish() {
    this.router.navigateByUrl('materialfinishes/new');
  }

  editMaterialFinish(i: number){
    const mf = this.materialFinishes[i];
    this.router.navigateByUrl('materialfinishes/edit/' + mf.id);
  }

  deleteMaterialFinish(i: number) {
    this.service.deleteMaterialFinish(this.materialFinishes[i].id).subscribe(() => {
      this.bar.open(
        'Material-Acabamento eliminado com sucesso.',
        '', {
          duration: 2000,
        });
        this.getMaterialFinishes();
    }, e => {
      this.bar.open(
        e.error,
        '', {
          duration: 2000,
        });
    });
  }

}
