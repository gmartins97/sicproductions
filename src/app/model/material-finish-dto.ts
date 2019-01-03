import { Material } from './Material';
import { SurfaceFinish } from './surface-finish';

export class MaterialFinishDTO {
    id?: number;
    materialDTO: Material;
    surfaceFinishDTO: SurfaceFinish;
    price: number;
    textureUrl: string;

    constructor(materialDTO: Material, surfaceFinishDTO: SurfaceFinish, price: number, textureUrl: string, id?: number) {
        this.id = id;
        this.materialDTO = materialDTO;
        this.surfaceFinishDTO = surfaceFinishDTO;
        this.price = price;
        this.textureUrl = textureUrl;
    }

}