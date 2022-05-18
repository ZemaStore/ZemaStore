import { Request, Response } from "express";
import Event from "../models/mongoose/event";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";

import {
  createEventSchema,
  deleteEventSchema,
  getEventSchema,
  getEventsSchema,
  updateEventSchema,
} from "../validation-schemas/event.schemas";

const fetchItemCount = 10;

const getEvent = async (req: Request, res: Response) => {
  try {
    const validate = getEventSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const event = await Event.findById(req.params.id);

    res.status(200).send(new OkResponse(event, "Event successfully fetched!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const getEvents = async (req: Request, res: Response) => {
  try {
    const validate = getEventsSchema.validate(req.query);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const { page, sort } = Utils.instance.getPaginationData(req);

    const count = await Event.count();
    const totalPages = Utils.instance.getNumberOfPages(count, fetchItemCount);

    const events = await Event.find({})
      .limit(fetchItemCount)
      .skip(page * fetchItemCount)
      .sort(sort);

    res
      .status(200)
      .send(
        new OkResponse(
          { events, totalPages, totalItems: count },
          "Events successfully fetched!"
        )
      );
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const createEvent = async (req: Request, res: Response) => {
  try {
    const validate = createEventSchema.validate(req.body);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const event = await Event.create(req.body);

    res.status(200).send(new OkResponse(event, "Event successfully created!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const updateEvent = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    const validate = updateEventSchema.validate(
      { params, body },
      { abortEarly: false }
    );
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    const event = await Event.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    });

    res.status(200).send(new OkResponse(event, "Event updated successfully!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const validate = deleteEventSchema.validate(req.params);
    if (validate.error && validate.error !== null) {
      return res
        .status(400)
        .send(new ErrorResponse(validate.error.message, null));
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).send(new OkResponse(null, "Event successfully deleted!"));
  } catch (e) {
    Utils.instance.handleResponseException(res, e);
  }
};

export { getEvent, getEvents, createEvent, updateEvent, deleteEvent };
