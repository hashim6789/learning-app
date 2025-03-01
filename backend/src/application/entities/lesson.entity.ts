export default class Lesson {
  constructor(
    public id: string | null,
    public title: string,
    public mentorId: string,
    public description: string | null,
    public materials: { id: string; title: string; duration: number }[] | null
  ) {}
}
