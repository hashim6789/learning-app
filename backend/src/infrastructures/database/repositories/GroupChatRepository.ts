import mongoose, { PipelineStage } from "mongoose";
import { Notification } from "../../../application/entities/notification.entity";
import IGroupChatRepository from "../../../application/IRepositories/IGroupChatRepository";
import { INotificationRepository } from "../../../application/IRepositories/INotificationRepository";
import { INotification } from "../interfaces/INotification";
import ChatGroupModel from "../models/ChatGroupModel";
import NotificationModel from "../models/NotificationModel";
import { IChatGroup } from "../interfaces/IChatGroup";
import { ChatGroup } from "../../../application/entities/chat-group.entity";
import { Document } from "mongoose";
import { pipeline } from "stream";

export class GroupChatRepository implements IGroupChatRepository {
  async createGroup(courseId: string, mentorId: string): Promise<any | null> {
    try {
      const group = new ChatGroupModel({
        course: courseId,
        mentor: mentorId,
        learners: [],
        createdAt: Date.now(),
      });

      const newGroup = await group.save();
      if (!newGroup) return null;
      return this.mapChatGroup(newGroup);
    } catch (error) {
      throw new Error(`The error when create group:${error}`);
    }
  }

  async addLearnerToGroup(
    courseId: string,
    userId: string
  ): Promise<any | null> {
    try {
      console.log("courseId", courseId);
      const result = await ChatGroupModel.updateOne(
        { course: courseId },
        { $addToSet: { learners: userId } }
      ).exec();

      console.log("result =", result);

      if (result.modifiedCount === 0) {
        return null;
      }

      return result;
    } catch (error) {
      throw new Error(`The error when adding learner to group:${error}`);
    }
  }

  async fetchAllByLearnerId(learnerId: string): Promise<any | null> {
    try {
      const pipeline = [
        { $match: { learners: new mongoose.Types.ObjectId(learnerId) } }, // Match first
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        {
          $lookup: {
            from: "learners", // Assuming 'users' is the collection where learner details are stored
            localField: "learners",
            foreignField: "_id",
            as: "learnerDetails",
          },
        },
        {
          $lookup: {
            from: "mentors", // Assuming 'users' is the collection where mentor details are stored
            localField: "mentor",
            foreignField: "_id",
            as: "mentorDetails",
          },
        },
        {
          $project: {
            _id: "$_id",
            title: "$courseDetails.title",
            thumbnail: "$courseDetails.thumbnail",
            memberCount: { $size: "$learners" }, // Calculating the number of learners
            learners: {
              $map: {
                input: "$learnerDetails",
                as: "learner",
                in: {
                  _id: "$$learner._id",
                  firstName: "$$learner.firstName",
                  lastName: "$$learner.lastName",
                  profilePicture: "$$learner.profilePicture",
                },
              },
            },
            mentor: {
              $arrayElemAt: [
                {
                  $map: {
                    input: "$mentorDetails",
                    as: "mentor",
                    in: {
                      _id: "$$mentor._id",
                      firstName: "$$mentor.firstName",
                      lastName: "$$mentor.lastName",
                      profilePicture: "$$mentor.profilePicture",
                    },
                  },
                },
                0,
              ],
            },
          },
        },
      ];
      const groups = await ChatGroupModel.aggregate(pipeline);

      console.log(groups);
      return groups;
    } catch (error) {
      throw new Error(`The error when fetching groups of learner:${error}`);
    }
  }
  //   async c(notification: Notification): Promise<Notification | null> {
  //     const newNotification = new NotificationModel({
  //       title: notification.title,
  //       message: notification.message,
  //       recipientId: notification.recipientId,
  //       createdAt: notification.createdAt,
  //     });
  //     const createdNotification = await newNotification.save();
  //     if (!createdNotification) return null;
  //     return this.mapToNotification(createdNotification);
  //   }

  private mapChatGroup = (doc: Document): ChatGroup => {
    return new ChatGroup(
      doc.get("_id").toString(),
      doc.get("course").toString(),
      doc.get("mentor").toString(),
      doc.get("learners"),
      doc.get("createdAt")
    );
  };
}

export default GroupChatRepository;
