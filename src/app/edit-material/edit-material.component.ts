import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SurfaceFinishService } from '../services/surface-finish.service';
import { MatSnackBar } from '@angular/material';
import { MaterialService } from '../services/material.service';
import { Material } from '../model/Material';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  materials: Material[];
  id: number;
  materialName: string = "";
  price: number;

  constructor(private router: Router, private route: ActivatedRoute,private bar: MatSnackBar, private service: MaterialService) { }

  ngOnInit() {
    this.getMaterial();
  }

  getMaterial() {
    this.route.params.subscribe(res => {
      this.id = <number>res.id;
    });

    this.service.getMaterials().subscribe(data => {
      this.materials = <Material[]>data;
      this.materialName = this.materials.find(m => m.id == this.id).name;
      this.price = this.materials.find(m => m.id == this.id).price;
    }, error => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter os materiais do servidor...`,
        '', {
          duration: 2000,
        });
    });
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

    if (this.price.toString().length == 0) {
      this.bar.open(
        `Preço do material não pode estar vazio.`,
        '', {
          duration: 2000,
        });
      return;
    }

    let mat: Material = { id: this.id, name: this.materialName, price: this.price };
    this.service.updateMaterial(this.id, mat).subscribe(res => {
      this.bar.open('Sucesso, o material foi editado.', '', { duration: 2000 });
      this.back();
    }, e => {
      this.bar.open(`Erro: ${e.error}`, '', { duration: 2000 });
    });
  }
  

  back(): void {
    this.router.navigateByUrl('/materials');
  }

}
