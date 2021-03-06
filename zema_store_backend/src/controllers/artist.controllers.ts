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

const fetchItemCount = 10;

const getArtist = async (req: Request, res: Response) => {
  try {
    const validate = getArtistSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const user = await User.findById(req.params.id).populate("profileId");

    res.status(200).send(new OkResponse(user, "Artist successfully fetched!"));
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

    const search = req.query.search;
    const searchExp = search?.toString().trim() || "";

    const count = isNil(search)
      ? await User.count({ roleId: role._id })
      : await ArtistProfie.count({
          firstName: {
            $regex: new RegExp(searchExp, "ig"),
          },
        });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const artists = isNil(search)
      ? await User.find({
          roleId: role._id,
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort)
          .populate("profileId")
      : await ArtistProfie.find({
          firstName: {
            $regex: new RegExp(searchExp, "ig"),
          },
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort)
          .exec();

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

    const { email, phone, password, firstName, lastName } = req.body;

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

    let upload;
    if (req.file) {
      const { path = "", filename = "" } = req.file;
      upload = await cloudinaryUploader(
        path,
        "auto",
        "UserPhotos",
        filename,
        res
      );
    }

    const profileModel = "ArtistProfile";
    const artistProfile = await ArtistProfie.create({
      firstName,
      lastName,
    });

    const user: IUserDocument = new User({
      email,
      password,
      phone,
      photoUrl: !isNil(upload) ? upload.secure_url : "",
      roleId: role._id,
      profileId: artistProfile._id,
      onModel: profileModel,
    });

    await user.save();

    const savedUser = await User.findById(user._id).populate("profileId");

    sendWelcomeEmail(email, firstName);

    return res
      .status(200)
      .send(new OkResponse(savedUser, "Artist successfully created!"));
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

    const { email, phone, password, firstName, lastName } = req.body;
    console.log(req.body, " is request body")
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
    user.photoUrl = !isNil(upload) ? upload.secure_url : user.photoUrl;

    artistProfile.firstName = firstName || artistProfile.firstName;
    artistProfile.lastName = lastName || artistProfile.lastName;

    await user.save();
    await artistProfile.save();

    const udpatedUser = await User.findById(user._id).populate("profileId");

    res
      .status(200)
      .send(new OkResponse(udpatedUser, "Artist successfully updated!"));
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

    res.status(200).send(new OkResponse(null, "User successfully deleted!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

export { getArtist, getArtists, addArtist, updateArtist, deleteArtist };
