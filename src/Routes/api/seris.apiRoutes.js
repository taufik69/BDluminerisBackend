import { Router } from "express";
import {
  serisController,
  getAllSeris,
} from "../../Controller/seris.controller.js";
import { setUploadDestination } from "../../middleware/setUploadDestination.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import { multerError } from "../../utils/MulterError.js";
const router = Router();
router
  .route("/seris")
  .post(
    setUploadDestination,
    upload.fields([{ name: "image", maxCount: 1 }]),
    multerError,
    serisController
  )
  .get(getAllSeris);

export default router;
