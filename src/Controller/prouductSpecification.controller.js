import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { productspecificationModel } from "../Model/ProductSpecification.model.js";
import { serisModel } from "../Model/Seris.model.js";
import { subserisModel } from "../Model/SubSeris.model.js";

const productspecificationcontroller = asyncHandler(async (req, res) => {
  const requiredFields = Object.keys(req.body);

  /**
   * todo :validate product Item dynamically
   */
  let productSpecificationObj = {};
  for (let field of requiredFields) {
    if (!req.body[field]) {
      if (field == "productSubSeris") {
        productSpecificationObj["productSubSeris"] = null;
        continue;
      }
      return res
        .status(400)
        .json(new ApiError(400, null, `${field} is Missing !!`));
    }

    productSpecificationObj[field] = req.body[field];
  }

  if (req.body?.productSubSeris) {
    productSpecificationObj["productSubSeris"] = req.body["productSubSeris"];
  }

  /**
   * todo: validate product image
   */

  const productSpecificationImage = req.files?.productImages;
  const productSpecificationVedio = req.files?.vedio;
  console.log(productSpecificationVedio);

  if (!productSpecificationImage?.length) {
    return res
      .status(400)
      .json(new ApiError(400, null, `productSpecificationImage is Missing !!`));
  }

  /**
   * todo: check if product already have database
   */
  /**
   * todo : Add new field in productSpecificationObj object
   */
  productSpecificationObj["productSpecificationImages"] =
    `${process.env.DOMAIN_NAME}/${req.headers["x-uploaddestination"]}/${productSpecificationImage[0].filename}`;

  if (productSpecificationVedio?.length) {
    productSpecificationObj["productSpecificationvedio"] =
      `${process.env.DOMAIN_NAME}/${req.headers["x-uploaddestination"]}/${productSpecificationVedio[0].filename}`;
  }

  /**
   * *check if catgory Title and Status is already exist
   */
  const isExistProductSpecification = await productspecificationModel.find({
    productItemCode: req.body?.productSeris,
  });
  console.log(isExistProductSpecification);

  if (isExistProductSpecification?.length) {
    return res
      .status(400)
      .json(new ApiError(400, null, `This product  is Already Exist `));
  }

  /**
   * todo : save data on database
   */
  const productSpecification = await new productspecificationModel(
    productSpecificationObj
  ).save();

  /**
   * todo : now store the product in the seris database
   */

  if (req.body?.productSubSeris) {
    await subserisModel.findOneAndUpdate(
      {
        _id: req.body?.productSubSeris,
      },
      {
        $push: { productTechnicalSpecification: productSpecification._id },
      },
      { new: true }
    );
  }
  await serisModel.findOneAndUpdate(
    {
      _id: req.body?.productSeris,
    },
    {
      $push: { productTechnicalSpecification: productSpecification._id },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        productSpecification,
        ` Product Tecnical Specification Created Sucessfull`
      )
    );
});

const getAllProductSpecification = asyncHandler(async (req, res) => {
  const ProductSpecificaiton = await productspecificationModel
    .find({})
    .populate([
      "productIpGrade",
      "productDimming",
      "productCct",
      "productMounting",
      "productSeris",
      "productSubSeris",
    ])
    .populate({
      path: "productGroup",
    });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        ProductSpecificaiton,
        "Get  All product Specification sucessfull"
      )
    );
});

export { productspecificationcontroller, getAllProductSpecification };
