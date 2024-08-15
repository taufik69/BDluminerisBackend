import multer from "multer";
import { ApiError } from "./ApiError.js";

const multerError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json(new ApiError(400, null, `Multer error: ${err}`));
  }
  next();
};

export { multerError };
