import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = "SiCProductions";
  authenticated : boolean = false;

  constructor(private bar: MatSnackBar,private authSrv : AuthService, private router : Router) {
    // Subscribe here, this will automatically update
    // "isUserLoggedIn" whenever a change to the subject is made.
    this.authSrv.isLoggedIn.subscribe( value => {
      this.authenticated = value;
    });
  }

  ngOnInit() {
  }

  logout() : void {
    this.authSrv.logout();
    this.router.navigate(["/home"]);
  }
}
