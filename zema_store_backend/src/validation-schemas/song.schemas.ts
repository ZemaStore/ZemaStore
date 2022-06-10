import Joi from "joi";

const getSongSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const getSongsSchema = Joi.object({
  search: Joi.string().optional(),
  page: Joi.number().optional(),
  sortBy: Joi.string().optional(),
});

const getSongsByArtistSchema = Joi.object({
  params: {
    artistId: Joi.string().hex().required(),
  },
  query: {
    page: Joi.number(),
    sortBy: Joi.string(),
  },
});

const getSongsByAlbumSchema = Joi.object({
  params: {
    albumId: Joi.string().hex().required(),
  },
  query: {
    page: Joi.number(),
    sortBy: Joi.string(),
  },
});

const addSongSchema = Joi.object({
  albumId: Joi.string().hex().length(24).required(),
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
  getSongsByAlbumSchema,
  getSongsByArtistSchema,
  addSongSchema,
  updateSongSchema,
  deleteSongSchema,
};
