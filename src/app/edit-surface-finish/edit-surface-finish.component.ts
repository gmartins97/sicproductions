import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-surface-finish',
  templateUrl: './edit-surface-finish.component.html',
  styleUrls: ['./edit-surface-finish.component.css']
})

export class EditSurfaceFinishComponent implements OnInit {

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
