export class Category {
  id?: number;
  description: string;
  parentId: number;

  constructor(description: string, parentId: number) {
    this.description = description;
    this.parentId = parentId;
  }
}
