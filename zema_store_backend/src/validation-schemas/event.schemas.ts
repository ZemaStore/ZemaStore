import Joi from "joi";

const getEventSchema = Joi.object({
  id: Joi.string().hex().required(),
});

const getEventsSchema = Joi.object({
  search: Joi.string().optional(),
  page: Joi.number(),
  sortBy: Joi.string(),
});

const createEventSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  venue: Joi.any().required(),
  date: Joi.date().required(),
  artistId: Joi.string().required(),
});

const updateEventSchema = Joi.object({
  params: {
    id: Joi.string().hex().required(),
  },
  body: {
    title: Joi.string().optional(),
    artistId: Joi.string().optional(),
    summary: Joi.string().optional(),
    venue: Joi.any().required(),
    date: Joi.date().optional(),
  },
});

const deleteEventSchema = Joi.object({
  id: Joi.string().hex().required(),
});

export {
  getEventSchema,
  getEventsSchema,
  createEventSchema,
  updateEventSchema,
  deleteEventSchema,
};
