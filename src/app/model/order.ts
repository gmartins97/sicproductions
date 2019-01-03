import { Item } from './Item';

export class order {
    itens: Item[];
    price: number;
    latitude: number;
    longitude: number;
    cidade: string;
    username: string;
  
    constructor(itens: Item[], price: number,  latitude: number ,  longitude: number , cidade: string , username: string) {
      this.itens = itens;
      this.price = price;
      this.latitude = latitude;
      this.longitude = longitude;
      this.cidade = cidade;
      this.username = username;
    }
  }
  