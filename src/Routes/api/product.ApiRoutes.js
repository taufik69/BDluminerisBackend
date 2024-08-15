import { Router } from "express";
const router = Router();

router.route("/product").post((req, res) => {
  console.log("hello");
});
export default router;
