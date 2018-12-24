import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private bar: MatSnackBar) { }

  ngOnInit() {
  }

  signUp() : void {
    this.bar.open("Não implementado ainda...", "", {duration: 3000});
  }

}
