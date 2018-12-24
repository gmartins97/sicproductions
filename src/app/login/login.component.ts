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

  isValidUser: boolean = false;

  _username: string = "";

  _password : string = "";

  constructor(private bar: MatSnackBar, private authSrv : AuthService, private router : Router) { }

  ngOnInit() {

  }

  login() : void {
    this.authSrv.login(this._username, this._password).subscribe(data => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expiryDate", data.expiration);
      window.location.href = "/home";
      this.bar.open("Login com sucesso.", "", {duration: 1500});
      //this.router.navigate(['/categories']);
    }, error => {
      this.bar.open("Ocorreu um erro...", "", {duration: 3000});
    });
  }
}
