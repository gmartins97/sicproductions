import { Component, OnInit } from '@angular/core';
import { Material } from '../model/Material';
import { SurfaceFinish } from '../model/surface-finish';
import { Router } from '@angular/router';
import { MaterialFinishService } from '../services/material-finish.service';
import { SurfaceFinishService } from '../services/surface-finish.service';
import { MaterialService } from '../services/material.service';
import { MatSnackBar } from '@angular/material';
import { MaterialFinish } from '../model/material-finish';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-material-finish',
  templateUrl: './create-material-finish.component.html',
  styleUrls: ['./create-material-finish.component.css']
})
export class CreateMaterialFinishComponent implements OnInit {

  materials: Material[];

  surfaceFinishes: SurfaceFinish[];

  material: number;

  surfaceFinish: number;

  textureUrl: string;

  form = new FormGroup({
    price: new FormControl()
  });


  constructor(private router: Router, private materialFinishService: MaterialFinishService,
    private surfaceFinishService: SurfaceFinishService, private materialService: MaterialService,
    private bar: MatSnackBar) { }

  ngOnInit() {
    this.materialService.getAll().subscribe(res => {
      this.materials = res;
      console.log(this.materials);
    }, e => {
      if(e.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez managerLogin. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar obter os materiais do servidor...`,
          '', {
            duration: 2000,
          });
      }
    });

    this.surfaceFinishService.getSurfaceFinishes().subscribe(res => {
      this.surfaceFinishes = res;
      console.log(this.surfaceFinishes);
    }, e => {
      if(e.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez managerLogin. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar obter os acabamentos do servidor...`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  confirm(): void {
    if (this.validate()) {
      const m = this.materials.find(m => m.id == this.material);
      const s = this.surfaceFinishes.find(s => s.id == this.surfaceFinish);
      const mf = new MaterialFinish(m, s, this.form.value.price, this.textureUrl);

      this.materialFinishService.createMaterialFinish(mf).subscribe(res => {
        this.bar.open(
          `Sucesso: O material-acabamento foi criado`,
          '', {
            duration: 2000,
          });
        this.back();
      }, e => {
        if(e.status == 401) {
          this.bar.open(
            'A sua sessão expirou ou não fez managerLogin. Por favor inicie sessão para continuar.',
            '', {
              duration: 2000,
            });
        } else {
          this.bar.open(
            `Erro: ${e.error}`,
            '', {
              duration: 2000,
            });
        }
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
