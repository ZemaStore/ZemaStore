import { Request, Response } from "express";
import { isNil } from "lodash";

import Playlist from "../models/mongoose/playlist";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";

import {
  createPlaylistSchema,
  deletePlaylistSchema,
  getPlaylistSchema,
  getPlaylistsSchema,
  updatePlaylistSchema,
} from "../validation-schemas/playlist.schemas";

const fetchItemCount = 10;

const getPlaylist = async (req: Request, res: Response) => {
  try {
    const validate = getPlaylistSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const playlist = await Playlist.findById({ _id: req.params.id })
      .populate("songs")
      .select("-createdAt -updatedAt -__v");

    res
      .status(200)
      .send(new OkResponse(playlist, "Playlist successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getPlaylists = async (req: Request, res: Response) => {
  try {
    const validate = getPlaylistsSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { page, sort } = Utils.instance.getPaginationData(req);
    const count = await Playlist.count({});
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const playlists = await Playlist.find({})
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort)
      .populate("songs")
      .select("-createdAt -updatedAt -__v");

    res
      .status(200)
      .send(
        new OkResponse(
          { playlists, totalPages, totalItems: count, pageNumber: page },
          "Playlists successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const createPlaylist = async (req: Request, res: Response) => {
  try {
    const validate = createPlaylistSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { userId, title, songs } = req.body;
    const playlist = await (
      await Playlist.create({ userId, title, songs })
    ).populate("songs");

    res.status(200).send(new OkResponse(playlist, null));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    const validate = updatePlaylistSchema.validate(
      { params, body },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const playlistData = await Playlist.findById(req.params.id);

    const { userId, title, songs } = req.body;

    playlistData.userId = !isNil(userId) ? userId : playlistData.userId;
    playlistData.title = !isNil(title) ? title : playlistData.title;
    playlistData.songs = !isNil(songs) ? songs : playlistData.songs;

    const playlist = await (await playlistData.save()).populate("songs");

    res
      .status(200)
      .send(new OkResponse(playlist, "Playlist successfully updated!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const validate = deletePlaylistSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    await Playlist.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send(new OkResponse(null, "Playlist successfully deleted!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

export {
  getPlaylist,
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
