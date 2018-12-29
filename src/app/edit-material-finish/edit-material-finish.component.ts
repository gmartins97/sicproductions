import { Component, OnInit } from '@angular/core';
import { MaterialFinish } from '../model/material-finish';
import { Material } from '../model/Material';
import { SurfaceFinish } from '../model/surface-finish';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialFinishService } from '../services/material-finish.service';
import { MaterialService } from '../services/material.service';
import { SurfaceFinishService } from '../services/surface-finish.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-material-finish',
  templateUrl: './edit-material-finish.component.html',
  styleUrls: ['./edit-material-finish.component.css']
})
export class EditMaterialFinishComponent implements OnInit {

  materials: Material[];

  surfaceFinishes: SurfaceFinish[];

  material: number;

  surfaceFinish: number;

  mf: MaterialFinish;

  form = new FormGroup({
    price: new FormControl()
  });


  constructor(private router: Router, private materialFinishService: MaterialFinishService,
    private surfaceFinishService: SurfaceFinishService, private materialService: MaterialService,
    private bar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {

    this.getMaterials();
    this.getSurfaceFinishes()

    let id: number;
    this.route.params.subscribe(res => {
      id = <number>res.id;
    });

    this.getMaterialFinish(id);
  }

  private getMaterials(): void {
    this.materialService.getAll().subscribe(res => {
      this.materials = res;
    }, e => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter os materiais do servidor...`,
        '', {
          duration: 2000,
        });
    });
  }

  private getSurfaceFinishes(): void {
    this.surfaceFinishService.getSurfaceFinishes().subscribe(res => {
      this.surfaceFinishes = res;
    }, e => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter os acabamentos do servidor...`,
        '', {
          duration: 2000,
        });
    });
  }

  private getMaterialFinish(id: number) {
    this.materialFinishService.getMaterialFinish(id).subscribe(res => {
      let data = <any>res;
      let m = new Material(data.materialDTO.name, data.materialDTO.price, data.materialDTO.id);
      let s = new SurfaceFinish(data.surfaceFinishDTO.name, data.surfaceFinishDTO.id);
      this.mf = new MaterialFinish(m, s, data.price, data.id);

      this.material = this.mf.material.id;
      this.surfaceFinish = this.mf.surface.id;
      (this.form.get('price') as FormControl).setValue(this.mf.price);
    }, e => {
      this.bar.open(
        e.error,
        '', {
          duration: 2000,
        });
    })
  }

  confirm(): void {
    if (this.validate()) {
      const m = this.materials.find(m => m.id == this.material);
      const s = this.surfaceFinishes.find(s => s.id == this.surfaceFinish);
      this.mf.material = m;
      this.mf.surface = s;
      this.mf.price = this.form.value.price;

      this.materialFinishService.updateMaterialFinish(this.mf).subscribe(res => {
        this.bar.open(
          `Sucesso: O material-acabamento foi editado com sucesso`,
          '', {
            duration: 2000,
          });
        this.back();
      }, e => {
        this.bar.open(
          e.error,
          '', {
            duration: 2000,
          });
      });

    }
  }

  back(): void {
    this.router.navigateByUrl('materialfinishes');
  }

  private validate() {
    if (this.material === undefined) {
      this.bar.open(
        `O material não foi selecionado`,
        '', {
          duration: 2000,
        });
      return false;
    }

    if (this.surfaceFinish === undefined) {
      this.bar.open(
        `O acabamento não foi selecionado`,
        '', {
          duration: 2000,
        });
      return false;
    }

    if (this.form.value.price === undefined) {
      this.bar.open(
        `O preço não foi introduzido`,
        '', {
          duration: 2000,
        });
      return false;
    }

    if (!this.form.valid) {
      this.bar.open(
        `O preço não cumpre todos os requesitos`,
        '', {
          duration: 2000,
        });
      return false;
    }

    if (this.form.value.price <= 0) {
      this.bar.open(
        `O preço tem que ser maior que 0`,
        '', {
          duration: 2000,
        });
      return false;
    }

    return true;
  }
}
