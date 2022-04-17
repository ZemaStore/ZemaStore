import { Request, Response } from "express";
import { isNil } from "lodash";

import { cloudinaryUploader } from "../middlewares/cloudinary.middlewares";
import ArtistProfie from "../models/artist-profile";
import Role from "../models/role";
import User, { IUserDocument } from "../models/user";
import { sendWelcomeEmail } from "../services/emails/send-email";
import {
  addArtistSchema,
  deleteArtistSchema,
  getArtistSchema,
  updateArtistSchema,
} from "../validation-schemas/artist.schemas";

const getArtist = async (req: Request, res: Response) => {
  try {
    const validate = getArtistSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const user = await User.findById(req.params.id).populate("profileId");

    const profile = user.profileId;

    const artist = {
      ...user,
      ...profile,
    };
    if (!artist) {
      return res
        .status(400)
        .send({ success: false, message: "User artist not found." });
    }

    res.status(200).send({ success: true, data: artist });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const getArtists = async (req: Request, res: Response) => {
  try {
    const validate = getArtistSchema.validate(req.query);
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

    const users = await User.find({})
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

const addArtist = async (req: Request, res: Response) => {
  try {
    const validate = addArtistSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const { email, phone, password, fullName } = req.body;

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

    sendWelcomeEmail(email, fullName);

    return res.status(201).send({ success: true, data: user });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
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

    res.status(200).send({ success: true, data: user });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
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
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

export { getArtist, getArtists, addArtist, updateArtist, deleteArtist };
