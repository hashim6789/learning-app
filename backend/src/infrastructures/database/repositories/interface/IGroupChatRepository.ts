export default interface IGroupChatRepository {
  createGroup(courseId: string, mentorId: string): Promise<any | null>;
  addLearnerToGroup(courseId: string, userId: string): Promise<any | null>;
  fetchAllByLearnerId(learnerId: string): Promise<any | null>;
  fetchAllByMentorId(learnerId: string): Promise<any | null>;
}
