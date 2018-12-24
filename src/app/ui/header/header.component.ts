import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = "SiCProductions";
  authenticated : boolean = false;
  constructor(private bar: MatSnackBar,private authSrv : AuthService) { }

  ngOnInit() {
    this.authenticated = this.authSrv.isAuthenticated();
  }

  logout() : void {
    this.authSrv.logout();
  }
}
