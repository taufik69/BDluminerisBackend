import multer from "multer";
import fs from "fs";
import path from "path";
import chalk from "chalk";
// import { ApiError } from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const finalPath = path.join("./public/temp/", req.UploadDesnitation);

    fs.mkdir(finalPath, { recursive: true }, (err) => {
      if (err) {
        console.log(
          chalk.bgRedBright("Multer file upload Path making failed", err)
        );
      }
    });
    cb(null, `${finalPath}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // const allowedFileTypes = [
    //   "image/jpeg",
    //   "image/png",
    //   "image/gif",
    //   "image/jpg",
    //   "image/gif",
    //   "video/gif",
    //   "video/mp4",
    //   "video/ogg",
    //   "video/wmv",
    //   "video/avi",
    //   "video/webm",
    //   "video/mkv",
    //   "video/mov",
    // ];
    // if (!allowedFileTypes.includes(file.mimetype)) {
    //   return cb(new multer.MulterError("Invalid file format"), false);
    // }
    cb(null, true);
  },
});

export { upload };
