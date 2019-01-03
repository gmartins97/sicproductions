import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  _username: string = "";
  _password : string = "";
  _retypePassword : string = "";
  _checked : boolean = false;
  _isClient : boolean = true;
  _companyPassword : string = "";

  valid : boolean = false;
  qrCodeImgSrc : string = "";
  tempSecret: string = "";

  token: string = "";

  constructor(private bar: MatSnackBar,private authSrv : AuthService, private router : Router) { }

  ngOnInit() {
  }

  signUp() : void {
    if(this.validate()) {
      if(!this._isClient) {

      this.authSrv.managerSignUp(this._username, this._password, this._retypePassword, this._companyPassword).subscribe(data => {
        this.bar.open(`${data.username} foi registado como gestor de conteúdos com sucesso. Pode iniciar sessão.`, "", {duration: 4000});
        this.router.navigate(["/login"]);
      }, error => {
        let errorJSON = JSON.stringify(error.error);
        this.bar.open(`Erro: ${errorJSON}`, "", {duration: 3500});
      });
      } else {
        this.authSrv.clientSetupSecret().subscribe(data => {
          this.tempSecret = data.tempSecret;
          this.qrCodeImgSrc = data.dataURL;
          this.valid = true;
        });
      }
    } else {
      this.bar.open("Por favor insira dados válidos.", "", {duration: 3000});
    }
  }

  confirmSignUp() : void {
    if(this.validate()) {
      if (this._isClient) {
        alert(`${this._username}, ${this.tempSecret}, ${this.token}`);
        this.authSrv.clientSignUp(this._username, this._password, this._retypePassword, this.tempSecret, this.token).subscribe(data => {
          this.bar.open(`${data.username} foi registado como cliente com sucesso. Pode iniciar sessão.`, "", {duration: 4000});
          this.router.navigate(["/login"]);
        }, error => {
          let errorJSON = JSON.stringify(error.error);
          this.bar.open(`Erro: ${errorJSON}`, "", {duration: 3500});
        });
      }
    }
  }

  private validate() : boolean {
    let validUsername = this._username.trim().length > 0 && !this._username.trim().includes(" ");
    let validPassword = this._password.length >= 6 && this._password.match(/[a-z]/) && this._password.match(/[A-Z]/) && this._password.match(/\d/);
    let validCheck = (this._checked == true);
    this._username = this._username.trim();
    return validUsername && validPassword && validCheck;
  }
}
