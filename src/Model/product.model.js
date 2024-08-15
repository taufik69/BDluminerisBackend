import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    Title: {
      type: String,
      trim: true,
      required: [true, "Missing cct Crendential"],
      lowercase: true,
    },
    productItemCode: {
      type: String,
      trim: true,
      required: [true, "Missing productItemCode "],
    },
    image: {
      type: String,
      required: [true, "Missing product image"],
    },
    productMrp: {
      type: Number,
      required: [true, "Missing product MRP"],
    },
    productPriority: {
      type: Number,
      required: [true, "Missing productPriority"],
    },
    productDescription: {
      type: String,
      required: [true, "Missing productDescription"],
      default: null,
    },
    seris: {
      type: Schema.Types.ObjectId,
      ref: "seris",
      default: null,
    },
    subseris: {
      type: Schema.Types.ObjectId,
      ref: "subseris",
      default: null,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
