import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from '../model/Material';
import { MatSnackBar } from '@angular/material';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  materialName: string = "";
  price: number;

  constructor(private router: Router, private bar: MatSnackBar, private service: MaterialService) { }

  ngOnInit() {
  }

  confirm(): void {

    if (this.materialName.trim().length == 0) {
      this.bar.open(
        `Nome do material não pode estar vazio.`,
        '', {
          duration: 2000,
        });
      return;
    }

    if (this.price.toString().length == 0 ){
      this.bar.open(
        `Preço do material não pode estar vazio.`,
        '', {
          duration: 2000,
        });
      return;
    }

    let mat = new Material(this.materialName, this.price)
    this.service.createMaterial(mat).subscribe(res => {
      this.bar.open('Sucesso, o material foi criado.', '', { duration: 2000 });
      this.back();
    }, e => {
      this.bar.open(`Erro: ${e.error}`, '', { duration: 2000 });
    });
  }

  back(): void {
    this.router.navigateByUrl('/materials');
  }

}
