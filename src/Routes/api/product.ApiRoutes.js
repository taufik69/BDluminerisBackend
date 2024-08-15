import { Router } from "express";
const router = Router();
import { multerError } from "../../utils/MulterError.js";
import { upload } from "../../middleware/multer.middleware.js";

router.route("/product").post((req, res) => {
  console.log("hello");
});
export default router;
