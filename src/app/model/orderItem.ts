export class orderItem {
  name: string;
  category: string;
  surfaceFinish: string;
  material: string;
  listProduct: orderItem[];
  height: number;
  depth: number;
  width: number;
  price: number;


  constructor(name: string, category: string, material: string, surfaceFinish: string, price: number, listProduct: orderItem[],
    height: number,  depth: number, width: number) {

    this.name = name;
    this.category = category;
    this.material = material;
    this.surfaceFinish = surfaceFinish;
    this.listProduct = listProduct;
    this.height = height;
    this.depth = depth;
    this.width = width;
    this.price=price;
  }
}
