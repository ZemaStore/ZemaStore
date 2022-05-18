import { Request, Response } from "express";
import ArtistProfie from "../models/mongoose/artist-profile";

import Follow from "../models/mongoose/follow";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";

import {
  createFollowerSchema,
  deleteFollowerSchema,
  getArtistFollowersSchema,
  getArtistsFollowedByUserSchema,
  getFollowerSchema,
  getFollowersSchema,
  updateFollowerSchema,
} from "../validation-schemas/follow.schemas";

const fetchItemCount = 10;

const getFollower = async (req: Request, res: Response) => {
  try {
    const validate = getFollowerSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const follower = await Follow.findById(req.params.id);

    res
      .status(200)
      .send(new OkResponse(follower, "Follower successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getFollowers = async (req: Request, res: Response) => {
  try {
    const validate = getFollowersSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(200)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { page, sort } = Utils.instance.getPaginationData(req);
    const count = await Follow.count({});
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const followers = await Follow.find({})
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort);

    res
      .status(200)
      .send(
        new OkResponse(
          { followers, totalPages, totalItems: count },
          "Followers successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getArtistFollowers = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const query = req.query;
    const validate = getArtistFollowersSchema.validate(
      { params, query },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const artistId = req.params.artistId;
    const { page, sort } = Utils.instance.getPaginationData(req);
    const count = await Follow.count({ artistId });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const followers = await Follow.find({ artistId })
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort)
      .populate("customerId");

    res
      .status(200)
      .send(
        new OkResponse(
          { followers, totalPages, totalItems: count },
          "Artist's followers successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getArtistsFollowedByUser = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const query = req.query;
    const validate = getArtistsFollowedByUserSchema.validate(
      { params, query },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const customerId = req.params.customerId;
    const { page, sort } = Utils.instance.getPaginationData(req);
    const count = await Follow.count({ customerId });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const artists = await Follow.find({ customerId })
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort)
      .populate("artistId");

    res
      .status(200)
      .send(
        new OkResponse(
          { artists, totalPages, totalItems: count },
          "Followed artists successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const createFollower = async (req: Request, res: Response) => {
  try {
    const validate = createFollowerSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const follower = await Follow.create(req.body);

    await ArtistProfie.findByIdAndUpdate(follower.artistId, {
      $inc: {
        followerNumber: 1,
      },
    });

    res
      .status(200)
      .send(new OkResponse(follower, "Follower successfully created!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const updateFollower = async (req: Request, res: Response) => {
  // try {
  //   const params = req.params;
  //   const body = req.body;
  //   const validate = updateFollowerSchema.validate(
  //     { params, body },
  //     { abortEarly: false }
  //   );
  //   if (validate.error && validate.error !== null) {
  //     return res
  //       .status(200)
  //       .send(new ErrorResponse(validate.error.message, null));
  //   }
  //   const follower = await Follow.findOneAndUpdate(
  //     { _id: req.params.id },
  //     req.body,
  //     { new: true }
  //   );
  //   res
  //     .status(200)
  //     .send(new OkResponse(follower, "Follower successfully updated!"));
  // } catch (e) {
  //   Utils.instance.handleResponseException(res, e);
  // }
};

const deleteFollower = async (req: Request, res: Response) => {
  try {
    const validate = deleteFollowerSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { artistId, customerId } = req.body;
    await Follow.deleteOne({ artistId, customerId });

    await ArtistProfie.findByIdAndUpdate(artistId, {
      $inc: {
        followerNumber: -1,
      },
    });

    res
      .status(200)
      .send(new OkResponse(null, "Follower successfully deleted!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

export {
  getFollower,
  getFollowers,
  getArtistFollowers,
  getArtistsFollowedByUser,
  createFollower,
  updateFollower,
  deleteFollower,
};
