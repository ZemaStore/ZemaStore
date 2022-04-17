import path from "path";
import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "/uploads/"));
  },
  filename: function (_req: Request, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp3|mpeg|wav)$/)) {
    return cb(new Error("Please upload an  audio file!"));
  }

  cb(undefined, true);
};

const uploader = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter,
});

export default uploader;
