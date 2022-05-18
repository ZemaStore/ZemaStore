import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.controllers";

const router = Router();

router.route("/:id").get(getEvent).patch(updateEvent).delete(deleteEvent);

router.route("/").get(getEvents).post(createEvent);

export default (() => Router().use("/events", router))();
