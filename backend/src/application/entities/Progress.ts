export class Progress {
  constructor(
    public id: string,
    public userId: string,
    public courseId: string,
    public completedLessons: string[],
    public completedMaterials: string[],
    public isCourseCompleted: boolean,
    public progress: number,
    public completedDate: number | null
  ) {}
}
