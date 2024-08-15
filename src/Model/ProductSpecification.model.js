import mongoose, { Schema } from "mongoose";

const productspecificationSchema = new Schema(
  {
    productWatts: {
      type: Number,
    },
    product_lumness_efficacy: {
      type: String,
      required: [true, "Missing product_lumness_efficacy "],
    },
    product_beam_angle: {
      type: String,
      required: [true, "Missing product_beam_angle"],
    },
    product_Rim_color: {
      type: String,
      required: [true, "Missing product_Rim_color"],
    },

    productIpGrade: {
      type: Schema.Types.ObjectId,
      ref: "ip",
    },
    Glair_UGI: {
      type: String,
      required: [true, "Missing Glair_UGI  "],
    },
    Body_color: {
      type: String,
      required: [true, "Missing Body_color  "],
    },

    productDimming: {
      type: Schema.Types.ObjectId,
      ref: "dimming",
      required: [true, "Missing productDimming"],
    },
    productCct: {
      type: Schema.Types.ObjectId,
      ref: "cct",
      required: [true, "Missing productCct"],
    },
    productCri: {
      type: Number,
      required: [true, "Missing productCri"],
    },
    productDimention: {
      type: String,
      required: [true, "Missing productDimention"],
    },

    productShape: {
      type: String,
      required: [true, "Missing productShape"],
    },
    productThickness: {
      type: String,
      required: [true, "Missing productThickness"],
    },
    productProtocol: {
      type: String,
      required: [true, "Missing productProtocol"],
    },
    productMounting: {
      type: String,
      ref: "mounting",
      required: [true, "Missing productMounting"],
    },

    productFinish: {
      type: String,
      required: [true, "Missing productFinish"],
    },

    productCustomization: {
      type: String,
      required: [true, "Missing productCustomization"],
    },
    productCapacity: {
      type: Number,
      required: [true, "Missing productCapacity"],
    },
    productSNote: {
      type: String,
      trim: true,
      required: [true, "Missing productSNote"],
    },

    productSpecificationImages: {
      type: String,
    },
    // productMrp: {
    //   type: Number,
    //   required: [true, "Missing productMrp"],
    // },

    productGroup: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: [true, "Missing product Groups"],
    },

    productSeris: {
      type: Schema.Types.ObjectId,
      ref: "seris",
      required: [true, "Missing product Seris "],
    },
    productSubSeris: {
      type: Schema.Types.ObjectId,
      ref: "subseris",
    },
    productPriority: {
      type: Number,
      required: [true, "Missing productPriority "],
    },

    productB_Finish: {
      type: Number,
      required: [true, "Missing productB_Finish "],
    },
    productSpecificationvedio: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export const productspecificationModel = mongoose.model(
  "productspecification",
  productspecificationSchema
);
