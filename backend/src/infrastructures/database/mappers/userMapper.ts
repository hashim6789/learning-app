// infrastructures/database/mappers/userMapper.ts
import { User } from "../../../application/entities/user.entity";
import { Admin } from "../../../application/entities/admin.entity";
import { Mentor } from "../../../application/entities/mentor.entity";
import { Learner } from "../../../application/entities/learner.entity";
import { Document } from "mongoose";

export const mapToUser = (doc: Document): User => {
  return new User(
    doc.get("email"),
    doc.get("password"),
    doc.get("_id").toString(),
    doc.get("isBlocked"),
    doc.get("isVerified"),
    doc.get("refreshToken"),
    doc.get("resetToken"),
    doc.get("profilePicture"),
    doc.get("firstName"),
    doc.get("lastName"),
    doc.get("googleId")
  );
};

export const mapToAdmin = (doc: Document): Admin => {
  return new Admin(
    doc.get("_id").toString(),
    doc.get("email"),
    doc.get("password"),
    doc.get("isBlocked"),
    doc.get("isVerified"),
    doc.get("refreshToken"),
    doc.get("resetToken")
  );
};

export const mapToMentor = (doc: Document): Mentor => {
  return new Mentor(
    doc.get("_id").toString(),
    doc.get("email"),
    doc.get("password"),
    doc.get("isBlocked"),
    doc.get("isVerified"),
    doc.get("refreshToken"),
    doc.get("resetToken"),
    doc.get("firstName"),
    doc.get("lastName"),
    doc.get("profilePicture"),
    doc.get("googleId"),
    doc.get("bankDetails"),
    doc.get("createdCourses")
  );
};

export const mapToLearner = (doc: Document): Learner => {
  return new Learner(
    doc.get("_id").toString(),
    doc.get("email"),
    doc.get("password"),
    doc.get("isBlocked"),
    doc.get("isVerified"),
    doc.get("refreshToken"),
    doc.get("resetToken"),
    doc.get("profilePicture"),
    doc.get("firstName"),
    doc.get("lastName"),
    doc.get("googleId"),
    doc.get("purchasedCourses")
  );
};
