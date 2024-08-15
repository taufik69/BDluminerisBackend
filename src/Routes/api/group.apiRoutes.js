import { Router } from "express";
import {
  groupContoller,
  getAllGroups,
} from "../../Controller/group.controller.js";
import { upload } from "../../middleware/multer.middleware.js";
import { multerError } from "../../utils/MulterError.js";
import { setUploadDestination } from "../../middleware/setUploadDestination.middleware.js";

const router = Router();
router
  .route("/create-group")
  .post(
    setUploadDestination,
    upload.fields([{ name: "image", maxCount: 1 }]),
    multerError,
    groupContoller
  )
  .get(getAllGroups);
export default router;
