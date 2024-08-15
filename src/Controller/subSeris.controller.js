import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { subserisModel } from "../Model/SubSeris.model.js";
import { serisModel } from "../Model/Seris.model.js";
const subSerisController = asyncHandler(async (req, res) => {
  const { Title, seris } = req.body;

  if (!Title) {
    return res
      .status(400)
      .json(new ApiError(400, null, `  Title   is Missing `));
  }

  /**
   * todo : found if  productTypeOne is Exist or not
   */
  const isExistsubseris = await subserisModel.find({
    $or: [{ Title }],
  });

  if (isExistsubseris.length) {
    return res
      .status(400)
      .json(new ApiError(400, null, `${Title}   Is Already Exist`));
  }
  /**
   * todo : make a new subseris
   * @instance new subserisModel
   */
  const subseris = await new subserisModel({
    Title,
    seris: seris ? seris : null,
  }).save();

  // if seris object id has then   update the seris subseris array
  if (seris) {
    await serisModel.findOneAndUpdate(
      { _id: seris },
      {
        $push: {
          subSeris: subseris._id,
        },
      },
      { new: true }
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, subseris, `${Title} subseris Created Sucessfull`)
    );
});

/**
 * todo : get allSubseris handeler getAllsubseris
 * method : find({})
 */
const getAllsubseris = asyncHandler(async (req, res) => {
  const getAllProductsubseris = await subserisModel
    .find({})
    .populate(["seris", "productTechnicalSpecification", "product"]);
  return res.status(200).json(new ApiResponse(200, getAllProductsubseris));
});

// delte subsris
const Deletesubseris = asyncHandler(async (req, res) => {
  const getAllProductsubseris = await subserisModel.findOneAndDelete({
    _id: req.params?.id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        getAllProductsubseris.Title + " delete sucessfull"
      )
    );
});
export { subSerisController, getAllsubseris, Deletesubseris };
