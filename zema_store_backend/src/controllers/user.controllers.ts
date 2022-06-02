import { Request, Response } from "express";
import { isNil } from "lodash";
import { cloudinaryUploader } from "../middlewares/cloudinary.middlewares";
import CustomerProfile from "../models/mongoose/customer-profile";
import Role from "../models/mongoose/role";

import User from "../models/mongoose/user";
import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";
import {
  changeUserStatusSchema,
  getUserSchema,
  getUsersSchema,
  udpateUserSchema,
} from "../validation-schemas/user.schemas";

const fetchItemCount = 10;

const getUser = async (req: Request, res: Response) => {
  try {
    const validate = getUserSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const user = await User.findById(req.params.id).populate("profileId");
    if (isNil(user)) {
      return res.status(400).send(new ErrorResponse("User not found!", null));
    }

    res.status(200).send(new OkResponse(user, "User successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getusers = async (req: Request, res: Response) => {
  try {
    const validate = getUsersSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const role = await Role.findOne({
      name: "USER",
    });

    const { page, sort } = Utils.instance.getPaginationData(req);

    const search = req.query.search;

    const count = isNil(search)
      ? await User.count({ roleId: role._id })
      : await CustomerProfile.count({
          fullName: {
            $regex: search,
          },
        });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const users = isNil(search)
      ? await User.find({
          roleId: role._id,
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort)
          .populate("profileId")
      : await CustomerProfile.find({
          fullName: {
            $regex: search,
          },
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort);

    res
      .status(200)
      .send(
        new OkResponse(
          { users, totalPages, totalItems: count, pageNumber: page },
          "Users successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
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
        .send(new ErrorResponse(validate.error.message, null));
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

    res.status(200).send(new OkResponse(user, "User successfully updated!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const changeUserStatus = async (req: Request, res: Response) => {
  try {
    const validate = changeUserStatusSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const id = req.params.id;

    console.log(req.params.id);

    const user = await User.findById(id);
    if (isNil(user)) {
      return res.status(400).send(new ErrorResponse("User not found!", null));
    }

    user.isActive = !user.isActive;
    await user.save();

    res
      .status(200)
      .send(new OkResponse(null, "User status successfully updated!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

export { getUser, getusers, updateUser, changeUserStatus };
