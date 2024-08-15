import mongoose, { Schema } from "mongoose";

const SerisSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Missing Seris Crendential"],
      trim: true,
    },
    image: {
      type: String,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: [true, "Missing Seris Crendential"],
    },
    subSeris: [
      {
        type: Schema.Types.ObjectId,
        ref: "subseris",
        default: null,
      },
    ],
    productTechnicalSpecification: [
      {
        type: Schema.Types.ObjectId,
        ref: "productspecification",
        required: [true, "Missing productspecification !!"],
      },
    ],

    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

export const serisModel = mongoose.model("seris", SerisSchema);
