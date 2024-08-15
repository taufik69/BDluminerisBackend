import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Missing CT TiTle"],
      trim: true,
    },

    images: {
      type: String,
      trim: true,
    },
    seris: [
      {
        type: Schema.Types.ObjectId,
        ref: "seris",
      },
    ],
  },
  { timestamps: true }
);

export const GroupModel = mongoose.model("groups", GroupSchema);
