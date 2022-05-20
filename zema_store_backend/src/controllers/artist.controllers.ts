import { Request, Response } from "express";
import { isNil } from "lodash";

import { cloudinaryUploader } from "../middlewares/cloudinary.middlewares";
import ArtistProfie from "../models/mongoose/artist-profile";
import Role from "../models/mongoose/role";
import User, { IUserDocument } from "../models/mongoose/user";
import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import { sendWelcomeEmail } from "../services/emails/send-email";
import Utils from "../utils/utils";

import {
  addArtistSchema,
  deleteArtistSchema,
  getArtistSchema,
  getArtistsSchema,
  updateArtistSchema,
} from "../validation-schemas/artist.schemas";

const limit = 10;

const getArtist = async (req: Request, res: Response) => {
  try {
    const validate = getArtistSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const user = await User.findById(req.params.id).populate("profileId");

    const profile = user.profileId;

    res.status(200).send({ success: true, data: user });
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getArtists = async (req: Request, res: Response) => {
  try {
    const validate = getArtistsSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { page, sort } = Utils.instance.getPaginationData(req);

    const role = await Role.findOne({
      name: "ARTIST",
    });

    const count = await User.count({ roleId: role._id });
    const totalPages = Utils.instance.getNumberOfPages(count, limit);

    const artists = await User.find({
      roleId: role._id,
    })
      .limit(limit)
      .skip(page * limit)
      .sort(sort)
      .populate("profileId");

    res
      .status(200)
      .send(
        new OkResponse(
          { artists, totalPages, totalItems: count, pageNumber: page },
          "Artists successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const addArtist = async (req: Request, res: Response) => {
  try {
    const validate = addArtistSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const { email, phone, password, fullName } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (!isNil(existingUser)) {
      return res
        .status(400)
        .send({ success: false, message: "Email is already in use." });
    }

    const role = await Role.findOne({ name: "ARTIST" });

    if (!role) {
      return res
        .status(400)
        .send({ success: false, message: "Role doesn't exist" });
    }

    const { path = "", filename = "" } = req.file;
    const upload = await cloudinaryUploader(
      path,
      "auto",
      "UserPhotos",
      filename,
      res
    );

    const profileModel = "ArtistProfile";
    const artistProfile = await ArtistProfie.create({
      fullName,
    });

    const user: IUserDocument = new User({
      email,
      password,
      phone,
      photoUrl: upload.secure_url || "",
      roleId: role._id,
      profileId: artistProfile._id,
      onModel: profileModel,
    });

    await user.save();

    const savedUser = await User.findById(user._id).populate("profileId");

    sendWelcomeEmail(email, fullName);

    return res.status(201).send({ success: true, data: savedUser });
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const updateArtist = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    const validate = updateArtistSchema.validate(
      { params, body },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const { email, phone, password, fullName } = req.body;

    const user = await User.findById(req.params.id);
    if (isNil(user)) {
      return res
        .status(400)
        .send({ success: false, message: "User not found." });
    }

    const artistProfile = await ArtistProfie.findById(user.profileId);
    if (isNil(artistProfile)) {
      return res
        .status(400)
        .send({ success: false, message: "User not found." });
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

    artistProfile.fullName = fullName || artistProfile.fullName;

    await user.save();
    await artistProfile.save();

    const udpatedUser = await User.findById(user._id).populate("profileId");

    res.status(200).send({ success: true, data: udpatedUser });
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const deleteArtist = async (req: Request, res: Response) => {
  try {
    const validate = deleteArtistSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const user = await User.findById(req.params.id);
    if (isNil(user)) {
      return res
        .status(400)
        .send({ success: false, message: "User not found." });
    }

    await user.delete();

    res.status(200).send({ success: true, data: user });
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

export { getArtist, getArtists, addArtist, updateArtist, deleteArtist };
