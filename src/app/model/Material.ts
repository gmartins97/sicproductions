export class Material {
  id?: number;
  name: string;
  price: number;

  constructor(name: string, price: number, id?: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
