import { Material } from './Material';
import { SurfaceFinish } from './surface-finish';

export class MaterialFinish {
    id?: number;
    material: Material;
    surface: SurfaceFinish;
    price: number;

    constructor(material: Material, surface: SurfaceFinish, price: number, id?: number) {
        this.id = id;
        this.material = material;
        this.surface = surface;
        this.price = price;
    }

}
