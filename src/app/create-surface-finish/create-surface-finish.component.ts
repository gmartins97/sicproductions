import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurfaceFinishService } from '../services/surface-finish.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-create-surface-finish',
  templateUrl: './create-surface-finish.component.html',
  styleUrls: ['./create-surface-finish.component.css']
})
export class CreateSurfaceFinishComponent implements OnInit {

  surfaceFinishName = '';
  minLengthValidation = true;

  constructor(private router: Router, private service: SurfaceFinishService, private bar: MatSnackBar) { }

  ngOnInit() {
  }

  confirm(): void {
    const sizeSurfaceFinishName = this.surfaceFinishName.trim().length;

    if (sizeSurfaceFinishName > 0) {
      this.service.createSurfaceFinish({ name: this.surfaceFinishName }).subscribe(res => {
        this.bar.open('Sucesso, o acabamento foi criado', '', { duration: 1000 });
        this.back();
      }, e => {
        this.bar.open(`Error: ${e.error}`, '', { duration: 2000 });
      });
    } else {
      this.minLengthValidation = false;
    }
  }

  back(): void {
    this.router.navigateByUrl('/surfaceFinishes');
  }
}
