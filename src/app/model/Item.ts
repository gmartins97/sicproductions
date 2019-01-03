import { orderItem } from './orderItem';

export class Item {
    product: orderItem;
    price: number;
  
    constructor(product: orderItem, price: number) {
      this.product = product;
      this.price = price;
    }
  }