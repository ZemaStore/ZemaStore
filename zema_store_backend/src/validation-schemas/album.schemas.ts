import Joi from "joi";

const getAlbumSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getAlbumsSchema = Joi.object({
  search: Joi.string().optional(),
  page: Joi.number().optional(),
  sortBy: Joi.string().optional(),
});

const getAlbumsByArtistSchema = Joi.object({
  params: {
    artistId: Joi.string().hex().required(),
  },
  query: {
    page: Joi.number(),
    sortBy: Joi.string(),
  },
});

const addAlbumSchema = Joi.object({
  artistId: Joi.string().hex().required(),
  title: Joi.string().required(),
  releaseDate: Joi.date(),
});

const updateAlbumSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    artistId: Joi.string().optional(),
    title: Joi.string().optional(),
    releaseDate: Joi.date().optional(),
  },
});

const searchAlbumSchema = Joi.object({
  title: Joi.string().required(),
});

const deleteAlbumSchema = Joi.object({
  id: Joi.string().hex().required(),
});

export {
  getAlbumSchema,
  getAlbumsSchema,
  getAlbumsByArtistSchema,
  addAlbumSchema,
  updateAlbumSchema,
  searchAlbumSchema,
  deleteAlbumSchema,
};
