// import mongoose, { Types } from "mongoose"; // Import Types explicitly
// import { ILearnerRepository } from "../../domain/repositories/ILearnerRepository";
// import LearnerModel from "../models/LearnerModel";
// import { Learner } from "../../domain/entities/Learner";

// export class MongoLearnerRepository implements ILearnerRepository {
//   async findByEmail(email: string): Promise<Learner | null> {
//     const learner = await LearnerModel.findOne({ email });
//     if (!learner) return null;

//     // Convert ObjectId[] to string[]
//     const purchasedCourses = learner.purchasedCourses
//       ? learner.purchasedCourses.map((courseId) => courseId.toString())
//       : null;

//     return new Learner(
//       learner.firstName,
//       learner.lastName,
//       learner.email,
//       learner.password,
//       learner.profilePicture,
//       purchasedCourses,
//       learner.isBlocked
//     );
//   }

//   async create(data: Learner): Promise<Learner> {
//     // Convert string[] to ObjectId[] before saving
//     const learnerData = {
//       ...data,
//       purchasedCourses: data.purchasedCourses?.map(
//         (courseId) => new Types.ObjectId(courseId)
//       ),
//     };

//     const newLearner = new LearnerModel(learnerData);
//     await newLearner.save();

//     const purchasedCourses = newLearner.purchasedCourses
//       ? newLearner.purchasedCourses.map((courseId) => courseId.toString())
//       : null;

//     return new Learner(
//       newLearner.firstName,
//       newLearner.lastName,
//       newLearner.email,
//       newLearner.password,
//       newLearner.profilePicture,
//       purchasedCourses,
//       newLearner.isBlocked
//     );
//   }
// }
