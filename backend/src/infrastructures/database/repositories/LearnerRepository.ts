import { ProgramUpdateLevel } from "typescript";
import { Learner } from "../../../application/entities/Learner";
import { ILearnerRepository } from "../../../application/IRepositories/ILearnerRepository";
import LearnerModel, { ILearner } from "../models/LearnerModel";

class LearnerRepository implements ILearnerRepository {
  //find learner by email
  async findByEmail(email: string): Promise<Learner | null> {
    const learner = await LearnerModel.findOne({ email });
    if (!learner) return null;
    return mappingLearner(learner);
  }

  //for google signup and login
  async findByGoogleId(googleId: string): Promise<Learner | null> {
    const learner = await LearnerModel.findOne({ googleId });
    if (!learner) return null;
    return mappingLearner(learner);
  }

  //to create a new learner
  async createLearner(data: Learner): Promise<Learner> {
    const newLearner = new LearnerModel(data);
    await newLearner.save();
    return mappingLearner(newLearner);
  }

  //to fetch all learners
  async fetchAllLearners(): Promise<Learner[] | null> {
    const learners = await LearnerModel.find();
    if (!learners || learners.length === 0) return null;
    return learners.map(mappingLearner);
  }

  async fetchLearnerById(learnerId: string): Promise<Learner | null> {
    const learner = await LearnerModel.findById(learnerId).populate({
      path: "purchasedCourses", // Path to the field being populated
      model: "Courses", // The model being populated
    });

    console.log("populated learner", learner);

    if (!learner) return null;
    return mappingLearner(learner);
  }

  async BlockLearner(
    learnerId: string,
    isBlock: boolean
  ): Promise<Learner | null> {
    const updatedLearner = await LearnerModel.findByIdAndUpdate(
      learnerId,
      { isBlocked: isBlock },
      { new: true }
    );
    if (!updatedLearner) return null;
    return mappingLearner(updatedLearner);
  }
}

//to convert ILearner to Learner
function mappingLearner(data: ILearner): Learner {
  const id = data._id.toString();
  const purchasedCourses = data.purchasedCourses
    ? data.purchasedCourses.map((courseId) => courseId.toString())
    : null;
  return new Learner(
    data.googleId || null,
    id,
    data.firstName,
    data.lastName,
    data.email,
    data.password,
    data.profilePicture,
    purchasedCourses,
    data.isBlocked
  );
}

export default LearnerRepository;
