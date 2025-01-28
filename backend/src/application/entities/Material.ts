export default class Material {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public type: string,
    public content?: string | null, // For reading materials
    public questions?: Array<object> | null, // For assessments
    public url?: string | null // For videos
  ) {}
}
