import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SurfaceFinishService } from '../services/surface-finish.service';
import { MatSnackBar } from '@angular/material';
import { SurfaceFinish } from '../model/surface-finish';

@Component({
  selector: 'app-edit-surface-finish',
  templateUrl: './edit-surface-finish.component.html',
  styleUrls: ['./edit-surface-finish.component.css']
})

export class EditSurfaceFinishComponent implements OnInit {

  surfaceFinishName: string;
  surface: SurfaceFinish;

  constructor(private router: Router, private route: ActivatedRoute, private service: SurfaceFinishService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getSurfaceFinish();
  }

  getSurfaceFinish() {
    let id: number;
    this.route.params.subscribe(res => {
      id = <number>res.id;
    });
    this.service.getSurfaceFinish(id).subscribe(res => {
      this.surface = res;
      this.surfaceFinishName = res.name;
    }, e => {
      this.bar.open(e.error, '', { duration: 2000 });
    });
  }

  confirm(): void {
    this.surface.name = this.surfaceFinishName;
    this.service.updateSurfaceFinish(this.surface).subscribe(res => {
      this.bar.open('Sucesso: o acabamento foi atualizado', '', { duration: 2000 });
      this.back();
    }, e => {
      this.bar.open(e.error, '', { duration: 2000 });
    });
  }

  back(): void {
    this.router.navigateByUrl('/surfaceFinishes');
  }

}
