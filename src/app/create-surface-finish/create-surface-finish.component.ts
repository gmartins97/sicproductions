import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-surface-finish',
  templateUrl: './create-surface-finish.component.html',
  styleUrls: ['./create-surface-finish.component.css']
})
export class CreateSurfaceFinishComponent implements OnInit {
  surfaceFinishName: string;
  price: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  confirm(): void {

  }

  back(): void {
    this.router.navigateByUrl('/surfaceFinishes');
  }

}
