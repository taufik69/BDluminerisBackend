import mongoose, { Schema } from "mongoose";

const subSerisSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Missing subseris Crendential"],
      trim: true,
    },
    seris: {
      type: Schema.Types.ObjectId,
      ref: "seris",
      default: null,
    },
    productTechnicalSpecification: [
      {
        type: Schema.Types.ObjectId,
        ref: "productspecification",
        required: [true, "Missing productspecification !!"],
      },
    ],
  },
  { timestamps: true }
);

export const subserisModel = mongoose.model("subseris", subSerisSchema);
