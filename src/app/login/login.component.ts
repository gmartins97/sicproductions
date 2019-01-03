import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _username: string = "";

  _password : string = "";

  constructor(private bar: MatSnackBar, private authSrv : AuthService, private router : Router) { }

  ngOnInit() {

  }

  login() : void {
    this.authSrv.managerLogin(this._username, this._password).subscribe(data => {
      this.authSrv.loginSucceeded(data);
      this.authSrv.setClient(false);
      this.bar.open("Login com sucesso.", "", {duration: 1500});
      this.router.navigate(['/home']);
    }, () => {
      this.authSrv.clientLogin(this._username, this._password).subscribe(data => {
        this.authSrv.loginSucceeded(data);
        this.authSrv.setClient(true);
        this.bar.open("Login com sucesso.", "", {duration: 1500});
        this.router.navigate(['/home']);
      }, () => {
        this.bar.open("Combinação de utilizador ou palavra-passe incorreta.", "", {duration: 3000});
      });
    });
  }
}
