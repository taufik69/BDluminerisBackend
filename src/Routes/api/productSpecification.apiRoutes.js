import { Router } from "express";
import {
  getAllProductSpecification,
  productspecificationcontroller,
} from "../../Controller/prouductSpecification.controller.js";
import { upload } from "../../middleware/multer.middleware.js";
import { multerError } from "../../utils/MulterError.js";
import { setUploadDestination } from "../../middleware/setUploadDestination.middleware.js";
const router = Router();

router
  .route("/productSpecification")
  .post(
    setUploadDestination,
    upload.fields([
      { name: "productImages", maxCount: 1 },
      { name: "vedio", maxCount: 1 },
    ]),
    multerError,
    productspecificationcontroller
  )
  .get(getAllProductSpecification);

export default router;
