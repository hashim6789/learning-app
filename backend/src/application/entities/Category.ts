export class Category {
  id?: string;
  title: string;
  isListed: boolean;
  constructor(title: string, isListed: boolean, id: string) {
    this.id = id;
    this.title = title;
    this.isListed = isListed;
  }
}
