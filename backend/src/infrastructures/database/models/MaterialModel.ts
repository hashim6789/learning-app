import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

//interface for basic Material
interface IMaterial extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  mentorId: ObjectId;
  type: "reading" | "assessment" | "video";
}

//interface for Material type "reading"
interface IReadingMaterial extends IMaterial {
  content: string;
}

//interface for Material type "assessment"
interface IAssessmentMaterial extends IMaterial {
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  totalMarks: number;
}

//interface for Material type "video"
interface IVideoMaterial extends IMaterial {
  url: string;
  duration: number;
}

// Base schema
const materialSchema = new Schema<IMaterial>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentors", required: true },
    type: {
      type: String,
      required: true,
      enum: ["reading", "assessment", "video"],
    },
  },
  {
    discriminatorKey: "type",
    collection: "materials",
    timestamps: true,
  }
);

// Specific schemas for each type
const readingMaterialSchema = new Schema<IReadingMaterial>({
  content: { type: String, required: true },
});

const assessmentMaterialSchema = new Schema<IAssessmentMaterial>({
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  totalMarks: { type: Number, required: true },
});

const videoMaterialSchema = new Schema<IVideoMaterial>({
  url: { type: String, required: true },
  duration: { type: Number, required: true },
});

// Create the base model
const MaterialModel = mongoose.model<IMaterial>("Material", materialSchema);

// Create discriminators for each type
const ReadingMaterial = MaterialModel.discriminator<IReadingMaterial>(
  "reading",
  readingMaterialSchema
);

const AssessmentMaterial = MaterialModel.discriminator<IAssessmentMaterial>(
  "assessment",
  assessmentMaterialSchema
);

const VideoMaterial = MaterialModel.discriminator<IVideoMaterial>(
  "video",
  videoMaterialSchema
);

// Export the models
export {
  MaterialModel,
  ReadingMaterial,
  AssessmentMaterial,
  VideoMaterial,
  IMaterial,
  IReadingMaterial,
  IAssessmentMaterial,
  IVideoMaterial,
};
