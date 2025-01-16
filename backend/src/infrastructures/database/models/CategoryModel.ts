import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ICategory extends Document {
  _id: ObjectId;
  title: string;
  isListed: boolean;
}

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  isListed: { type: Boolean, required: true },
});

const CategoryModel = mongoose.model<ICategory>("Categories", CategorySchema);

export default CategoryModel;
