import { Router } from "express";
import {
  subSerisController,
  getAllsubseris,
  Deletesubseris,
} from "../../Controller/subSeris.controller.js";

const router = Router();
router.route("/subseris").post(subSerisController).get(getAllsubseris);
router.route("/delete-subsris/:id").delete(Deletesubseris);

export default router;
