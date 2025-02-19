//imported the entity
import { Learner } from "../../../application/entities/Learner";

//imported the interface
import { ILearnerRepository } from "../../../application/IRepositories/ILearnerRepository";

//imported the mode\
import LearnerModel from "../models/LearnerModel";
import { ILearner } from "../interfaces/ILearner";
import { IUserRepository } from "../../../application/IRepositories/IUserRepository";
import { mapToLearner } from "../mappers/userMapper";
import { UserQuery } from "../../../shared/types/query";

class LearnerRepository implements ILearnerRepository {
  // //to create a new learner
  async create(data: Learner): Promise<Learner> {
    const newLearner = new LearnerModel(data);
    await newLearner.save();
    return mapToLearner(newLearner);
  }

  async fetchAll({
    status = "all",
    search = "",
    page = "1",
    limit = "10",
  }: UserQuery): Promise<{ users: Learner[]; docCount: number } | null> {
    try {
      const query = {
        isBlocked:
          status !== "all"
            ? status === "blocked"
              ? true
              : false
            : { $exists: true },
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      };
      const learners = await LearnerModel.find(query)
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .sort({ createdAt: -1 });

      if (!learners) return null;

      const totalCount = await LearnerModel.countDocuments(query);

      const mappedLearners = learners.map((learner) => mapToLearner(learner));

      return { users: mappedLearners, docCount: totalCount };
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return null;
      }
      throw new Error("Failed to fetch the learners!");
    }
  }

  //fetch learner by id
  async fetchById(learnerId: string): Promise<Learner | null> {
    const learner = await LearnerModel.findById(learnerId);
    // .populate({
    //   path: "purchasedCourses",
    //   model: "Courses",
    // });

    if (!learner) return null;
    return mapToLearner(learner);
  }

  async updateById(
    learnerId: string,
    data: Partial<Learner>
  ): Promise<Learner | null> {
    try {
      const updatedLearner = await LearnerModel.findByIdAndUpdate(
        learnerId,
        data,
        { new: true }
      );
      if (!updatedLearner) return null;
      return mapToLearner(updatedLearner);
    } catch (error) {
      throw new Error("An error when update the learner");
    }
  }

  async deleteById(learnerId: string): Promise<Learner | null> {
    try {
      const deletedMentor = await LearnerModel.findByIdAndDelete(learnerId);
      if (!deletedMentor) return null;
      return mapToLearner(deletedMentor);
    } catch (error) {
      throw new Error("An error when deleting the learner");
    }
  }

  async fetchByField(field: { [key: string]: any }): Promise<Learner | null> {
    try {
      const learner = await LearnerModel.findOne(field);
      if (!learner) return null;
      return mapToLearner(learner);
    } catch (error) {
      throw new Error("An error when find the mentor by refreshToken");
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
      return mapToLearner(learner);
    } catch (error) {
      throw new Error("An error when update the learner");
    }
  }

  async deleteLearnerById(learnerId: string): Promise<Learner | null> {
    try {
      const deletedLearner = await LearnerModel.findByIdAndDelete(learnerId);
      if (!deletedLearner) return null;
      return mapToLearner(deletedLearner);
    } catch (error) {
      throw new Error("An error when deleting the learner");
    }
  }

  // //block learner
  // async BlockLearner(
  //   learnerId: string,
  //   isBlock: boolean
  // ): Promise<Learner | null> {
  //   const updatedLearner = await LearnerModel.findByIdAndUpdate(
  //     learnerId,
  //     { isBlocked: isBlock },
  //     { new: true }
  //   );
  //   if (!updatedLearner) return null;
  //   return mappingLearner(updatedLearner);
  // }

  // async setOtpToDB(learnerId: string, otp: string): Promise<Learner | null> {
  //   try {
  //     const learner = await LearnerModel.findByIdAndUpdate(
  //       learnerId,
  //       { otp, otpExpiration: Date.now() + 5 * 1000 * 60 },
  //       { new: true }
  //     );
  //     if (!learner) return null;
  //     return mappingLearner(learner);
  //   } catch (error) {
  //     throw new Error("An error when set the refresh token in to db");
  //   }
  // }

  // async findByRefreshToken(token: string): Promise<Learner | null> {
  //   try {
  //     const learner = await LearnerModel.findOne({ refreshToken: token });
  //     if (!learner) return null;
  //     return mappingLearner(learner);
  //   } catch (error) {
  //     throw new Error("An error when find the learner by refreshToken");
  //   }
  // }

  // async deleteRefreshToken(learnerId: string): Promise<Learner | null> {
  //   try {
  //     const unRefreshedLearner = await LearnerModel.findByIdAndUpdate(
  //       learnerId,
  //       { refreshToken: null },
  //       { new: true }
  //     );
  //     if (!unRefreshedLearner) return null;
  //     return mappingLearner(unRefreshedLearner);
  //   } catch (error) {
  //     throw new Error("An error when delete the learner's refresh token!");
  //   }
  // }

  // async setRefreshToken(
  //   learnerId: string,
  //   token: string
  // ): Promise<Learner | null> {
  //   try {
  //     const refreshedLearner = await LearnerModel.findByIdAndUpdate(
  //       learnerId,
  //       { refreshToken: token },
  //       { new: true }
  //     );
  //     if (!refreshedLearner) return null;
  //     return mappingLearner(refreshedLearner);
  //   } catch (error) {
  //     throw new Error("An error when");
  //   }
  // }

  // async verifyLearner(learnerId: string): Promise<Learner | null> {
  //   try {
  //     const verifiedLearner = await LearnerModel.findByIdAndUpdate(
  //       learnerId,
  //       { isVerified: true },
  //       { new: true }
  //     );
  //     if (!verifiedLearner) return null;
  //     return mappingLearner(verifiedLearner);
  //   } catch (error) {
  //     throw new Error("An error when the learner verifying!");
  //   }
  // }
}

//to convert ILearner to Learner
// function mappingLearner(data: ILearner): Learner {
//   const id = data._id.toString();
//   const purchasedCourses = data.purchasedCourses
//     ? data.purchasedCourses.map((courseId) => courseId.toString())
//     : null;
//   return new Learner(
//     data.googleId || null,
//     id,
//     data.firstName,
//     data.lastName || null,
//     data.email,
//     data.password,
//     data.profilePicture,
//     purchasedCourses,
//     data.isBlocked || false,
//     data.isVerified || false,
//     data.refreshToken || null,
//     data.resetToken || null
//   );
// }

export default LearnerRepository;
