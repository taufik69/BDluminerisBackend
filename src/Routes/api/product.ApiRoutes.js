import { Router } from "express";
const router = Router();
import { multerError } from "../../utils/MulterError.js";
import { upload } from "../../middleware/multer.middleware.js";
import {
  ProductController,
  getAllProduct,
  getProduct,
  DeleteProduct,
} from "../../Controller/product.controller.js";
import { setUploadDestination } from "../../middleware/setUploadDestination.middleware.js";

router
  .route("/product")
  .post(
    setUploadDestination,
    upload.single("image"),
    multerError,
    ProductController
  )
  .get(getAllProduct);

// get the specific product with the help of id
router.route("/product/:id").get(getProduct).delete(DeleteProduct);
export default router;
