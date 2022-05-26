import fs from "fs";
import path from "path";
import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "..", "/uploads/");
    fs.mkdir(dir, (err) => cb(null, dir));
  },
  filename: function (_req: Request, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const audioFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp3|mpeg|wav)$/)) {
    return cb(new Error("Please upload an  audio file!"));
  }

  cb(undefined, true);
};

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
    return cb(new Error("Please upload an  audio file!"));
  }

  cb(undefined, true);
};

const audioUploader = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: audioFilter,
});

const imageUploader = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: imageFilter,
});

export { audioUploader, imageUploader };
