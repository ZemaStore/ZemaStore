import Joi from "joi";

const getFollowerSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getFollowersSchema = Joi.object({
  page: Joi.number(),
  sortBy: Joi.string(),
});

const getArtistFollowersSchema = Joi.object({
  params: {
    artistId: Joi.string().hex().required(),
  },
  query: {
    page: Joi.number(),
    sortBy: Joi.string(),
  },
});

const getArtistsFollowedByUserSchema = Joi.object({
  params: {
    customerId: Joi.string().hex().required(),
  },
  query: {
    page: Joi.number(),
    sortBy: Joi.string(),
  },
});

const createFollowerSchema = Joi.object({
  artistId: Joi.string().hex().required(),
  customerId: Joi.string().hex().required(),
});

const updateFollowerSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    artistId: Joi.string().hex().optional(),
    customerId: Joi.string().hex().optional(),
  },
});

const deleteFollowerSchema = Joi.object({
  artistId: Joi.string().hex().required(),
  customerId: Joi.string().hex().required(),
});

export {
  getFollowerSchema,
  getFollowersSchema,
  getArtistFollowersSchema,
  getArtistsFollowedByUserSchema,
  createFollowerSchema,
  updateFollowerSchema,
  deleteFollowerSchema,
};
