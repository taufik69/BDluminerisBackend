import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { productModel } from "../Model/product.model.js";
import { serisModel } from "../Model/Seris.model.js";
import { subserisModel } from "../Model/SubSeris.model.js";

const ProductController = asyncHandler(async (req, res, next) => {
  const {
    productItemCode,
    Title,
    productMrp,
    productDescription,
    seris,
    subseris,
    productPriority,
  } = req.body;

  /**
   * Check if product is not Exist
   */
  if (!Title) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, `Product ${Title} is Missing `));
  }

  if (!productMrp) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, `Product ${productMrp} is Missing `));
  }
  if (!productDescription) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, `Product ${productDescription} is Missing `)
      );
  }
  if (!productPriority) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, `Product ${productPriority} is Missing `)
      );
  }

  if (!productItemCode) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, `Product ${productItemCode} is Missing `)
      );
  }

  const Image = req.file;

  if (!Image) {
    return res
      .status(400)
      .json(new ApiError(400, null, `product Image is Missing !!`));
  }

  /**
   * todo : Check is dimming Title is  already exist
   * @method: mongoose.find({Title:Tile})
   */
  const isproduct = await productModel.find({
    $or: [{ productItemCode }, { Title }],
  });
  if (isproduct.length) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          null,
          `Product ${Title} or ${productItemCode} Is Already Exist`
        )
      );
  }

  /**
   * todo : make a new productModel
   * @instance new productModel
   */

  const product = await new productModel({
    productItemCode,
    Title,
    productMrp,
    productDescription,
    seris: seris ? seris : null,
    subseris: subseris ? subseris : null,
    productPriority,
    image: `${process.env.DOMAIN_NAME}/${req.headers["x-uploaddestination"]}/${Image.filename}`,
  }).save();

  if (seris) {
    await serisModel.findOneAndUpdate(
      { _id: product.seris },
      {
        $push: { product: product._id },
      },
      {
        new: true,
      }
    );
  }

  if (subseris) {
    await subserisModel.findOneAndUpdate(
      { _id: product.subseris },
      {
        $push: { product: product._id },
      },
      {
        new: true,
      }
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, ` Created Sucessfull `));
});

/**
 * todo : get all product annd see all Field
 */

const getAllProduct = asyncHandler(async (req, res) => {
  const productList = await productModel.find({}).populate({
    path: "seris",
    populate: ["subSeris", "group", "productTechnicalSpecification", "product"],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, productList, "All Products Fetch Sucessfull"));
});

// get specific product of this db

const getProduct = asyncHandler(async (req, res) => {
  console.log(req.params);
  try {
    const Singleproduct = await productModel
      .find({ _id: req.params?.id })
      .populate({
        path: "seris",
        populate: [
          "subSeris",
          "group",
          "productTechnicalSpecification",
          "product",
        ],
      })
      .populate({
        path: "subseris",
        populate: ["seris", "product", "productTechnicalSpecification"],
      });

    return res
      .status(200)
      .json(
        new ApiResponse(200, Singleproduct, "All Products Fetch Sucessfull")
      );
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, `single Product error: ${error}`));
  }
});

const DeleteProduct = asyncHandler(async (req, res) => {
  try {
    await productModel.findOneAndDelete({
      _id: req.params?.id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Delete product Sucessfull"));
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, `single Product error: ${error}`));
  }
});

export { ProductController, getAllProduct, getProduct, DeleteProduct };
