import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SurfaceFinish } from '../model/surface-finish';
import { SurfaceFinishService } from '../services/surface-finish.service';

@Component({
  selector: 'app-surface-finish',
  templateUrl: './surface-finish.component.html',
  styleUrls: ['./surface-finish.component.css']
})
export class SurfaceFinishComponent implements OnInit {
  displayedColumns = ['position', 'name', 'edit', 'remove'];
  surfaces: SurfaceFinish[] = [];
  dataSource = new MatTableDataSource(this.surfaces);

  constructor(private router: Router, private service: SurfaceFinishService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getSurfaceFinishes();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getSurfaceFinishes(): void {
    this.service.getSurfaceFinishes().subscribe(data => {
      this.surfaces = <SurfaceFinish[]>data;
      this.dataSource.data = this.surfaces;
    }, e => {
      this.bar.open(
        'Ocorreu um erro ao tentar obter os acabamentos do servidor...',
        '', {
          duration: 2000,
        });
    });
  }

  addSurfaceFinish(): void {
    this.router.navigateByUrl('/surfaceFinishes/new');
  }

  editSurfaceFinish(surfaceIndex): void {
    const sf = this.surfaces[surfaceIndex];
    this.router.navigateByUrl('/surfaceFinishes/edit/' + sf.id);
  }

  deleteSurfaceFinish(index: number): void {
    this.service.deleteSurfaceFinish(this.surfaces[index].id).subscribe(
      sf => {
        this.bar.open(`Acabamento ${sf.name} removido com sucesso`, '', { duration: 2000 });
        this.getSurfaceFinishes();
      },
      e => {
        this.bar.open('Ocorreu um erro: ' + e.error, '', { duration: 2000 });
      });
  }

}
