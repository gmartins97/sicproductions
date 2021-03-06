import { Category } from './category';
import { MaterialFinish } from "./material-finish";
import { Dimensions } from './dimensions';
import { OptionalProducts } from './optional-products';

export class Product {
  id?: number;
  name: string;
  category: Category;
  materialFinishes: MaterialFinish[];
  dimensions: Dimensions;
  optionalProducts: OptionalProducts[];
  minOccupancyPercentage: number;
  maxOccupancyPercentage: number;
  
  constructor(name: string, category: Category, materialfinishes: MaterialFinish[], dimensions: Dimensions,
    parts: OptionalProducts[], minOccupancyPercentage: number, maxOccupancyPercentage: number, id?: number) {

    this.id = id;
    this.name = name;
    this.category = category;
    this.materialFinishes = materialfinishes;
    this.dimensions = dimensions;
    this.optionalProducts = parts;
    this.minOccupancyPercentage = minOccupancyPercentage;
    this.maxOccupancyPercentage = maxOccupancyPercentage;
  }
}
