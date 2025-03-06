export default class Meeting {
  constructor(
    public id: string,
    public courseId: string,
    public mentorId: string,
    public learnerId: string,
    public roomId: string,
    public slotId: string
  ) {}
}

export interface PopulateMeeting {
  id: string;
  course: { _id: string; title: string };
  mentor: { firstName: string; lastName: string };
  learner: { firstName: string; lastName: string };
  roomId: string;
  slot: { _id: string; dateTime: Date };
}
