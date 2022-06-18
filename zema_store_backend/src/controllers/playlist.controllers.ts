import axios from "axios";
import { Request, Response } from "express";
import { isNil } from "lodash";
import CustomerProfile from "../models/mongoose/customer-profile";

import Playlist from "../models/mongoose/playlist";
import Song from "../models/mongoose/song";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";

import {
  addUserPreferenceSchema,
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

const addUserPreference = async (req: Request, res: Response) => {
  try {
    const validate = addUserPreferenceSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }
    const artists = req.body.artists;
    const genres = req.body.genres;

    const customer = await CustomerProfile.findById(res.locals.user?.profileId);
    customer.favoriteArtists = artists;
    customer.favoriteGenres = genres;

    await customer.save();

    res
      .status(200)
      .send(new OkResponse(null, "User preference successfully added!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getPopularPlaylist = async (req: Request, res: Response) => {
  try {
    // const popular = await axios.get(
    //   "https://recommnder-playlist.herokuapp.com/get-popular/4"
    // );
    const playlist = await Song.find({
      listenersCount: {
        $gte: 1,
      },
    });

    res
      .status(200)
      .send(
        new OkResponse(playlist, "Popular playlist successfully fetched!")
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getRecommendedPlaylist = async (req: Request, res: Response) => {
  try {
    // const similar = await axios.get(
    //   "https://recommnder-playlist.herokuapp.com/get-similarity/4"
    // );
    const customer = await CustomerProfile.findById(res.locals.user?.profileId);
    const fetchArtistPreferenceSongs = await Promise.all(
      customer.favoriteArtists.map(async (artistId) => {
        const song = await Song.find({ artistId });
        return song;
      })
    );
    const fetchGenrePreferenceSongs = await Promise.all(
      customer.favoriteGenres.map(async (genre) => {
        const song = await Song.find({ genre });
        return song;
      })
    );

    const playlist = fetchArtistPreferenceSongs.concat(
      fetchGenrePreferenceSongs
    );

    res
      .status(200)
      .send(
        new OkResponse(
          playlist,
          "Recommended playlist successfully fetched!"
        )
      );
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
  addUserPreference,
  getPopularPlaylist,
  getRecommendedPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
