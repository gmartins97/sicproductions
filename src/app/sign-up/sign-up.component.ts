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

  constructor(private bar: MatSnackBar,private authSrv : AuthService, private router : Router) { }

  ngOnInit() {
  }

  signUp() : void {
    if(this.validate()) {
      this.authSrv.signUp(this._username, this._password, this._retypePassword).subscribe(data => {
        this.bar.open(`${data.username} foi registado com sucesso. Pode iniciar sessão.`, "", {duration: 2000});
        this.router.navigate(["/login"]);
      }, error => {
        let errorJSON = JSON.stringify(error.error);
        this.bar.open(`Erro: ${errorJSON}`, "", {duration: 3500});
      });
    } else {
      this.bar.open("Por favor insira dados válidos.", "", {duration: 3000});
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
