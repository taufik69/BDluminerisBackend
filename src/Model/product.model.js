import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    Title: {
      type: String,
      trim: true,
      required: [true, "Missing cct Crendential"],
      lowercase: true,
    },
    Productimage: {
      type: String,
      required: [true, "Missing product image"],
    },
    productMrp: {
      type: Number,
      required: [true, "Missing product MRP"],
    },
    productDescription: {
      type: String,
      required: [true, "Missing productDescription"],
      default: "",
    },
    seris: {
      type: Schema.Types.ObjectId,
      ref: "seris",
    },
    subseris: {
      type: Schema.Types.ObjectId,
      ref: "subseris",
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
