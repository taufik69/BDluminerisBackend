import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GroupModel } from "../Model/Group.model.js";
import path from "path";
import fs from "fs";
const groupContoller = asyncHandler(async (req, res) => {
  // get a body input
  const { Title } = req.body;
  if (!Title) {
    return res
      .status(400)
      .json(new ApiError(400, null, `Group Title  is Missing !!!`));
  }

  /**
   * todo : Takes a file
   */
  // const groupImage = req.files?.images;

  const groupImage = req.files?.image;

  if (!groupImage) {
    throw new ApiError(400, `groupImage field is Missing `);
  }

  /**
   * *check if groupImage Title  is already exist
   */
  const isExistGroup = await GroupModel.find({
    $or: [{ Title }],
  });

  if (isExistGroup.length) {
    throw new ApiError(400, `${Title}  is Already Exist `);
  }

  /**
   * todo : crate a catgory in catgory field
   */

  const Groups = await new GroupModel({
    Title,
    images: `${process.env.DOMAIN_NAME}/${req.headers["x-uploaddestination"]}/${groupImage[0].filename}`,
  }).save();
  return res
    .status(200)
    .json(new ApiResponse(200, Groups, `${Title} Created Sucessfull`));
});

/**
 * todo : get all product in
 */

const getAllGroups = asyncHandler(async (req, res) => {
  const getCategory = await GroupModel.find({}).populate("seris");
  return res
    .status(200)
    .json(new ApiResponse(200, getCategory, "AllGroup Fetch Sucessfull"));
});

const DeleteGroup = asyncHandler(async (req, res) => {
  try {
    const deletedGroup = await GroupModel.findOne({
      _id: req.params?.id,
    });

    const deleteImagePath = path.join(
      "./public/temp/",
      deletedGroup?.images?.split("/").slice(3).join("/")
    );

    fs.unlink(deleteImagePath, (err) => {
      if (err) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, `Delete group error: ${err}`));
      }
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          deletedGroup?.Title + " Delete Group Sucessfull"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, `Delete group error: ${error}`));
  }
});

export { groupContoller, getAllGroups, DeleteGroup };
