import mongoose from "mongoose";
const { model, Schema } = mongoose;

const calculate_schema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    Result: Number,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const calculations =
  mongoose.models.calculations || model("calculations", calculate_schema);
