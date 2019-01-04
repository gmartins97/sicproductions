import { Item } from './Item';

export class order {
    _id?: number;
    item: Item[];
    totalPrice: number;
    latitude: number;
    longitude: number;
    cidade: string;
    username: string;
    state: string;
    date: Date;
  
    constructor(itens: Item[], totalPrice: number,  latitude: number ,  longitude: number , cidade: string , username: string) {
      this.item = itens;
      this.totalPrice = totalPrice;
      this.latitude = latitude;
      this.longitude = longitude;
      this.cidade = cidade;
      this.username = username;
    }
  }
  