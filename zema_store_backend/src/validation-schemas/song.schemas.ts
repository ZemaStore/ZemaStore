import Joi from "joi";

const getSongSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const getSongsSchema = Joi.object({
  limit: Joi.string(),
  skip: Joi.string(),
  sortBy: Joi.string(),
});

const addSongSchema = Joi.object({
  albumId: Joi.string().hex().length(24).required(),
  artistId: Joi.string().hex().length(24).required(),
  title: Joi.string().required().required(),
  genre: Joi.string().valid("reggae", "pop", "rock"),
  listenersCount: Joi.number(),
  length: Joi.string().required(),
  releaseDate: Joi.string().required(),
});

const updateSongSchema = Joi.object({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: {
    albumId: Joi.string().hex().length(24),
    artistId: Joi.string().hex().length(24),
    title: Joi.string(),
    genre: Joi.string(),
    listenersCount: Joi.number(),
    length: Joi.string(),
    releaseDate: Joi.string(),
  },
});

const deleteSongSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  getSongSchema,
  getSongsSchema,
  addSongSchema,
  updateSongSchema,
  deleteSongSchema,
};
