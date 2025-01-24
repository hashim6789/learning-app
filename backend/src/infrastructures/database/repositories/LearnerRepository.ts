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

  async setOtpToDB(learnerId: string, otp: string): Promise<Learner | null> {
    try {
      const learner = await LearnerModel.findByIdAndUpdate(
        learnerId,
        { otp, otpExpiration: Date.now() + 5 * 1000 * 60 },
        { new: true }
      );
      if (!learner) return null;
      return mappingLearner(learner);
    } catch (error) {
      throw new Error("An error when set the refresh token in to db");
    }
  }

  async findByRefreshToken(token: string): Promise<Learner | null> {
    try {
      const learner = await LearnerModel.findOne({ refreshToken: token });
      if (!learner) return null;
      return mappingLearner(learner);
    } catch (error) {
      throw new Error("An error when find the learner by refreshToken");
    }
  }

  async deleteRefreshToken(learnerId: string): Promise<Learner | null> {
    try {
      const unRefreshedLearner = await LearnerModel.findByIdAndUpdate(
        learnerId,
        { refreshToken: null },
        { new: true }
      );
      if (!unRefreshedLearner) return null;
      return mappingLearner(unRefreshedLearner);
    } catch (error) {
      throw new Error("An error when delete the learner's refresh token!");
    }
  }

  async setRefreshToken(
    learnerId: string,
    token: string
  ): Promise<Learner | null> {
    try {
      const refreshedLearner = await LearnerModel.findByIdAndUpdate(
        learnerId,
        { refreshToken: token },
        { new: true }
      );
      if (!refreshedLearner) return null;
      return mappingLearner(refreshedLearner);
    } catch (error) {
      throw new Error("An error when");
    }
  }

  async verifyLearner(learnerId: string): Promise<Learner | null> {
    try {
      const verifiedLearner = await LearnerModel.findByIdAndUpdate(
        learnerId,
        { isVerified: true },
        { new: true }
      );
      if (!verifiedLearner) return null;
      return mappingLearner(verifiedLearner);
    } catch (error) {
      throw new Error("An error when the learner verifying!");
    }
  }

  async updateLearner(
    learnerId: string,
    data: Partial<Learner>
  ): Promise<Learner | null> {
    try {
      const learner = await LearnerModel.findByIdAndUpdate(learnerId, data, {
        new: true,
      });
      if (!learner) return null;
      return mappingLearner(learner);
    } catch (error) {
      throw new Error("An error when update the learner");
    }
  }

  async deleteLearnerById(learnerId: string): Promise<Learner | null> {
    try {
      const deletedLearner = await LearnerModel.findByIdAndDelete(learnerId);
      if (!deletedLearner) return null;
      return mappingLearner(deletedLearner);
    } catch (error) {
      throw new Error("An error when deleting the learner");
    }
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
    data.lastName || null,
    data.email,
    data.password,
    data.profilePicture,
    purchasedCourses,
    data.isBlocked || false,
    data.isVerified || false,
    data.refreshToken || null,
    data.resetToken || null
  );
}

export default LearnerRepository;
