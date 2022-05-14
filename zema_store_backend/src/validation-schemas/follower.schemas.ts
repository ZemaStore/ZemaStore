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
