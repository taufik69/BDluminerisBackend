import { Router } from "express";
import {
  groupContoller,
  getAllGroups,
  DeleteGroup,
} from "../../Controller/group.controller.js";
import { upload } from "../../middleware/multer.middleware.js";
import { multerError } from "../../utils/MulterError.js";
import { setUploadDestination } from "../../middleware/setUploadDestination.middleware.js";

const router = Router();
router
  .route("/group")
  .post(
    setUploadDestination,
    upload.fields([{ name: "image", maxCount: 1 }]),
    multerError,
    groupContoller
  )
  .get(getAllGroups);

router.route("/delete-group/:id").delete(DeleteGroup);
export default router;
