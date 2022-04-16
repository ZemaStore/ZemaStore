import { Request, Response } from "express";
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

    const songs = Song.find({})
      .limit(parseInt(limit.toString()))
      .skip(parseInt(skip.toString()))
      .sort(sort);
  } catch (e) {}
};

const addSong = async (req: Request, res: Response) => {
  try {
    const {
      albumId,
      artistId,
      title,
      song,
      genre,
      listenersCount,
      length,
      releaseDate,
    } = req.body;

    const validate = addSongSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send({ success: false, message: validate.error.message });
    }

    const songData = new Song({
      albumId,
      artistId,
      title,
      song,
      genre,
      listenersCount,
      length,
      releaseDate,
    });

    await songData.save();

    res.status(201).send({
      success: true,
      message: "Song saved successfully",
      data: songData,
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
      song,
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

    songData.albumId = albumId || songData.albumId;
    songData.artistId = artistId || songData.artistId;
    songData.title = title || songData.title;
    songData.song = song || songData.song;
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

    const song = await Song.deleteOne({
      _id: req.params.id,
    });

    if (!song) {
      return res
        .status(400)
        .send({ success: false, message: "Song not found." });
    }

    res.status(200).send({
      success: true,
      message: "Song deleted successfully.",
      data: song,
    });
  } catch (e) {}
};

export { getSong, getSongs, addSong, updateSong, deleteSong };
