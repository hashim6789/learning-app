export default class Lesson {
  constructor(
    public id: string | null,
    public title: string,
    public courseId: string,
    public description: string | null,
    public materials: string[] | null
  ) {}
}
