import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  materialName: string;
  price: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  confirm(): void {

  }

  back(): void {
    this.router.navigateByUrl('/materials');
  }

}
