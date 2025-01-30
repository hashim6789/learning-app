export default class Material {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public type: string,
    public url: string | null,
    public duration: number
  ) {}
}
