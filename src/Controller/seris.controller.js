import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { serisModel } from "../Model/Seris.model.js";
import { GroupModel } from "../Model/Group.model.js";

const serisController = asyncHandler(async (req, res) => {
  const { Title, groups } = req.body;

  if (!Title) {
    return res
      .status(400)
      .json(
        new ApiError(400, null, ` ${Title || "Seris Title"} is Missing !!`)
      );
  }

  if (!groups) {
    return res
      .status(400)
      .json(new ApiError(400, null, ` Group  is Missing !!`));
  }

  const serisImage = req.files?.image;

  if (!serisImage) {
    return res
      .status(400)
      .json(new ApiError(400, null, ` ${"serisImage"} is Missing `));
  }

  /**
   * todo : found if  seris is Exist or not
   */
  const isExistSeris = await serisModel.find({
    $or: [{ Title }],
  });

  if (isExistSeris.length) {
    return res
      .status(400)
      .json(new ApiError(400, null, `${Title}   Is Already Exist`));
  }
  /**
   * todo : make a new seris
   * @instance new seris
   */
  /**
   * todo : push the seris id of groups database
   *
   */

  const newseris = await new serisModel({
    Title,
    group: groups,
    image: `${process.env.DOMAIN_NAME}/${req.headers["x-uploaddestination"]}/${serisImage[0].filename}`,
  }).save();

  await GroupModel.findOneAndUpdate(
    { _id: groups },
    {
      $push: { seris: newseris._id },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, newseris, `${Title} Seris  Created Sucessfull`));
});

const getAllSeris = asyncHandler(async (req, res) => {
  const getAllProductTypeOneController = await serisModel
    .find({})
    .populate("group");

  return res
    .status(200)
    .json(new ApiResponse(200, getAllProductTypeOneController));
});

export { serisController, getAllSeris };
