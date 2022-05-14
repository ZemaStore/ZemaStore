import Joi from "joi";

const getPlaylistSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getPlaylistsSchema = Joi.object({
  page: Joi.number(),
  sortBy: Joi.string(),
});

const createPlaylistSchema = Joi.object({
  userId: Joi.string().hex().required(),
  title: Joi.string().required(),
  songs: Joi.array().items(Joi.string().hex()).required(),
});

const updatePlaylistSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    userId: Joi.string().hex().optional(),
    title: Joi.string().optional(),
    songs: Joi.array().items(Joi.string().hex()).optional(),
  },
});

const deletePlaylistSchema = Joi.object({
  id: Joi.string().hex().required(),
});

export {
  getPlaylistSchema,
  getPlaylistsSchema,
  createPlaylistSchema,
  updatePlaylistSchema,
  deletePlaylistSchema,
};
