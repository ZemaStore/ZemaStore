import { Request, Response } from "express";
import { isNil } from "lodash";
import axios from "axios";
import { nanoid } from "nanoid";

import {
  cloudinaryRemover,
  cloudinaryUploader,
} from "../middlewares/cloudinary.middlewares";

import Song from "../models/mongoose/song";
import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";

import {
  addSongSchema,
  deleteSongSchema,
  getSongsByAlbumSchema,
  getSongsByArtistSchema,
  getSongSchema,
  getSongsSchema,
  updateSongSchema,
} from "../validation-schemas/song.schemas";
import Album from "../models/mongoose/album";
import User from "../models/mongoose/user";
import Role from "../models/mongoose/role";

const fetchItemCount = 10;

const getSong = async (req: Request, res: Response) => {
  try {
    const validate = getSongSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const songData = await Song.findById(req.params.id);

    const role = await Role.findById(res.locals.user?.roleId);
    if (role.name === "ADMIN") {
      return res
        .status(200)
        .send(new OkResponse({ song: songData }, "Song successfully fetched!"));
    }

    const song = await axios.post(
      "https://zemastore-file-server.herokuapp.com/upload",
      {
        audio_url: songData.song,
        random_file_name: nanoid(),
        aes_key: isNil(res.locals.user?.aes_key)
          ? null
          : res.locals.user?.aes_key,
        aes_iv: isNil(res.locals.user?.aes_iv) ? null : res.locals.user?.aes_iv,
      }
    );

    await Song.findByIdAndUpdate(songData._id, {
      $inc: {
        listenersCount: 1,
      },
    });

    song.data.title = songData.title;

    if (isNil(res.locals.user?.aes_iv) || isNil(res.locals.user?.aes_key)) {
      const user = await User.findById(res.locals.user?._id);
      user.aes_key = song.data?.aes_key;
      user.aes_iv = song.data?.aes_iv;
      await user.save();
    }

    res
      .status(200)
      .send(new OkResponse({ song: song.data }, "Song successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getSongs = async (req: Request, res: Response) => {
  try {
    const validate = getSongsSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { page, sort } = Utils.instance.getPaginationData(req);
    let field;
    let word;
    const search = req.query.search;
    if (search) {
      const parts = (<string>req.query.search).split(":");
      field = parts[0];
      word = parts[1];
    }

    let count;
    let totalPages;
    let songs;

    if (!isNil(search)) {
      if (field === "genre") {
        count = await Song.count({
          genre: {
            $regex: word,
          },
        });
        totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

        songs = await Song.find({
          genre: {
            $regex: word,
          },
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort);
      } else {
        count = await Song.count({
          title: {
            $regex: word,
          },
        });
        totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

        songs = await Song.find({
          title: {
            $regex: word,
          },
        })
          .limit(fetchItemCount)
          .skip(page * fetchItemCount)
          .sort(sort);
      }
    } else {
      count = await Song.count({});
      totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

      songs = await Song.find({})
        .limit(fetchItemCount)
        .skip(page * fetchItemCount)
        .sort(sort);
    }
    res
      .status(200)
      .send(
        new OkResponse(
          { songs, totalPages, totalItems: count, pageNumber: page },
          "Songs successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getSongsByAlbum = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const query = req.query;
    const validate = getSongsByAlbumSchema.validate(
      { params, query },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const albumId = req.params.albumId;
    const { page, sort } = Utils.instance.getPaginationData(req);
    const count = await Song.count({
      albumId,
    });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const songs = await Song.find({
      albumId,
    })
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort);

    res
      .status(200)
      .send(
        new OkResponse(
          { songs, totalPages, totalItems: count, pageNumber: page },
          "Songs successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getSongsByArtist = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const query = req.query;
    const validate = getSongsByArtistSchema.validate(
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
    const count = await Song.count({
      artistId,
    });
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const songs = await Song.find({
      artistId,
    })
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort);

    res
      .status(200)
      .send(
        new OkResponse(
          { songs, totalPages, totalItems: count, pageNumber: page },
          "Songs successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const addSong = async (req: Request, res: Response) => {
  try {
    const { albumId, title, genre, length, releaseDate } = req.body;
    const validate = addSongSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const { path = "", filename = "" } = req.file;

    const upload = await cloudinaryUploader(
      path,
      "raw",
      "AudioUploads",
      filename,
      res
    );

    const album = await Album.findById(albumId);
    if (isNil(album)) {
      return res.status(400).send(new ErrorResponse("Album not found!", null));
    }

    const artistId = album.artistId;

    const songData = new Song({
      albumId,
      artistId,
      title,
      song: upload.secure_url,
      genre,
      length,
      releaseDate,
    });

    const song = await songData.save();

    res.status(201).send({
      success: true,
      message: "Song saved successfully",
      data: song,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const updateSong = async (req: Request, res: Response) => {
  try {
    const {
      albumId,
      artistId,
      title,
      genre,
      listenersCount,
      length,
      releaseDate,
    } = req.body;

    const params = req.params;
    const body = req.body;

    const validate = updateSongSchema.validate(
      { params, body },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const songData = await Song.findById(req.params.id);

    if (!songData) {
      return res
        .status(400)
        .send({ success: false, message: "Song is not found." });
    }
    let upload;
    if (req.file) {
      const { path, filename } = req.file;
      upload = await cloudinaryUploader(
        path,
        "raw",
        "AudioUploads",
        filename,
        res
      );
    }

    songData.song = upload ? upload.secure_url : songData.song;
    songData.albumId = albumId || songData.albumId;
    songData.artistId = artistId || songData.artistId;
    songData.title = title || songData.title;
    songData.genre = genre || songData.genre;
    songData.listenersCount = listenersCount || songData.listenersCount;
    songData.length = length || songData.length;
    songData.releaseDate = releaseDate || songData.releaseDate;

    const updatedSong = await songData.save();

    res.status(200).send({
      success: true,
      message: "song updated successfuly",
      data: updatedSong,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const deleteSong = async (req: Request, res: Response) => {
  try {
    const validate = deleteSongSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const song = await Song.findOne({
      _id: req.params.id,
    });

    if (!song) {
      return res
        .status(400)
        .send({ success: false, message: "Song not found." });
    }

    await song.delete();

    const url = song.song.split("/");
    const public_id = [url[url.length - 2], url[url.length - 1]].join("/");

    await cloudinaryRemover(public_id.replace(/%20/g, " ").toString());

    res.status(200).send({
      success: true,
      message: "Song deleted successfully.",
      data: song,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

export {
  getSong,
  getSongs,
  getSongsByAlbum,
  getSongsByArtist,
  addSong,
  updateSong,
  deleteSong,
};
