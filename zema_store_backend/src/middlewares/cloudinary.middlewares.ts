import fs from "fs";

import { Response } from "express";
import cloudinary from "cloudinary";

import configs from "../configs/app.configs";

cloudinary.v2.config({
  cloud_name: configs.CLOUD_NAME,
  api_key: configs.API_KEY,
  api_secret: configs.API_SECRET,
});

const cloudinaryUploader = async (
  path: string,
  resource_type: string,
  folder: string,
  filename: string,
  res: Response
) => {
  const upload = await cloudinary.v2.uploader.upload(
    path,
    {
      resource_type,
      public_id: `${folder}/${filename}`,
    },

    (err, file) => {
      if (err) return res.send({ success: false, message: err });

      fs.unlinkSync(path);
    }
  );

  return upload;
};

const cloudinaryRemover = async (public_id: string) => {
  await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
    console.log(result, error);
  });
};

export { cloudinaryRemover, cloudinaryUploader };
