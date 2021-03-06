import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  authenticated : boolean;
  constructor(private authSrv : AuthService) {
    this.authSrv.isLoggedIn.subscribe( value => {
      this.authenticated = value;
    });
  }

  ngOnInit() {
  }

}
