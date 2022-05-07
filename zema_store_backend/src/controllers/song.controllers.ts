import { Request, Response } from "express";

import {
  cloudinaryRemover,
  cloudinaryUploader,
} from "../middlewares/cloudinary.middlewares";
import Song from "../models/song";
import {
  addSongSchema,
  deleteSongSchema,
  getSongSchema,
  getSongsSchema,
  updateSongSchema,
} from "../validation-schemas/song.schemas";

const getSong = async (req: Request, res: Response) => {
  try {
    const validate = getSongSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const song = await Song.findById(req.params.id);

    res.status(200).send({
      success: true,
      message: "song returned successfylly",
      data: song,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const getSongs = async (req: Request, res: Response) => {
  try {
    const { limit = "10", skip = "0", sortBy } = req.query;
    const sort = {};
    if (sortBy) {
      const parts = sortBy.toString().split(" ");
      const val = parts[1] === "asc" ? 1 : -1;
      sort[parts[0]] = val;
    }
    const validate = getSongsSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const songs = await Song.find({})
      .limit(parseInt(limit.toString()))
      .skip(parseInt(skip.toString()))
      .sort(sort);

    res.status(200).send({ success: true, data: songs });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: (e as Error).message });
  }
};

const addSong = async (req: Request, res: Response) => {
  try {
    const { albumId, artistId, title, genre, length, releaseDate } = req.body;

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

    console.log(upload.url.split("/"), "song url");

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
        "AudioUploader",
        filename,
        res
      );
    }

    songData.albumId = albumId || songData.albumId;
    songData.artistId = artistId || songData.artistId;
    songData.title = title || songData.title;
    songData.song = upload.secure_url || songData.song;
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
    console.log(public_id.replace(/%20/g, " "));
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

export { getSong, getSongs, addSong, updateSong, deleteSong };
