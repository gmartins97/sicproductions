import { Category } from './category';
import { MaterialFinish } from "./material-finish";
import { Dimensions } from './dimensions';

export class Product {
  id?: number;
  name: string;
  category: Category;
  materialFinishes: MaterialFinish[];
  dimensions: Dimensions;
  parts: Product[];
  minOccupancyPercentage: number;
  maxOccupancyPercentage: number;

  constructor(name: string, category: Category, materialfinishes: MaterialFinish[], dimensions: Dimensions,
    parts: Product[], minOccupancyPercentage: number, maxOccupancyPercentage: number, id?: number) {

    this.id = id;
    this.name = name;
    this.category = category;
    this.materialFinishes = materialfinishes;
    this.dimensions = dimensions;
    this.parts = parts;
    this.minOccupancyPercentage = minOccupancyPercentage;
    this.maxOccupancyPercentage = maxOccupancyPercentage;
  }
}
