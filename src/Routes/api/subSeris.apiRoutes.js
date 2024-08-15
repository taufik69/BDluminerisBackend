import { Router } from "express";
import {
  subSerisController,
  getAllsubseris,
} from "../../Controller/subSeris.controller.js";

const router = Router();
router.route("/subseris").post(subSerisController).get(getAllsubseris);

export default router;
