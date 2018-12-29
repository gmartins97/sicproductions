import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-catalogue',
  templateUrl: './client-catalogue.component.html',
  styleUrls: ['./client-catalogue.component.css']
})
export class ClientCatalogueComponent implements OnInit {

  productName: string = "Teste";
  collection: string = "Coleção Teste";

  constructor() { }

  ngOnInit() {
  }

}
