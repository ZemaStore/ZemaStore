import { Request, Response } from "express";
import { isNil } from "lodash";
import { cloudinaryUploader } from "../middlewares/cloudinary.middlewares";
import CustomerProfile from "../models/customer-profile";
import Role from "../models/role";

import User from "../models/user";
import {
  getUserSchema,
  getUsersSchema,
  udpateUserSchema,
} from "../validation-schemas/user.schemas";

const getUser = async (req: Request, res: Response) => {
  try {
    const validate = getUserSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const user = await User.findById(req.params.id).populate("profileId");
    if (isNil(user)) {
      return res
        .status(400)
        .send({ success: false, message: "User not found." });
    }

    res.status(200).send({ success: true, data: user });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const getusers = async (req: Request, res: Response) => {
  try {
    const validate = getUsersSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const { limit = "10", skip = "0", sortBy } = req.query;

    const sort = {};
    if (sortBy) {
      const parts = sortBy.toString().split(":");
      const val = parts[1] === "asc" ? 1 : -1;
      sort[parts[0]] = val;
    }

    const role = await Role.findOne({
      name: "USER",
    });

    const users = await User.find({
      roleId: role._id,
    })
      .limit(parseInt(limit.toString()))
      .skip(parseInt(skip.toString()))
      .sort(sort)
      .populate("profileId");

    res.status(200).send({ success: true, data: users });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    const validate = udpateUserSchema.validate(
      { params, body },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const { email, password, phone, fullName } = req.body;

    const user = await User.findById(req.params.id).populate("profileId");

    if (fullName) {
      const userProfile = await CustomerProfile.findById(user._id);
      userProfile.fullName = fullName;
      await userProfile.save();
    }

    let upload;
    if (req.file) {
      const { path, filename } = req.file;
      upload = await cloudinaryUploader(
        path,
        "auto",
        "UserPhotos",
        filename,
        res
      );
    }

    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    user.photoUrl = upload.secure_url || user.photoUrl;

    await user.save();

    res.status(200).send({ success: true, data: user });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

export { getUser, getusers, updateUser };
