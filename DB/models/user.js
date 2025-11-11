import mongoose from "mongoose";
const { model, Schema } = mongoose;

const user_schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const user = mongoose.models.user || model("user", user_schema);
