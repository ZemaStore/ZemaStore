import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.controllers";
import { isAdmin, isAuthorized } from "../middlewares/auth.middlewares";
import { imageUploader } from "../middlewares/multer.middlewares";

const router = Router();

router
  .route("/:id")
  .get(getEvent)
  .patch(imageUploader.single("cover"), isAdmin, updateEvent)
  .delete(isAdmin, deleteEvent);

router
  .route("/")
  .get(getEvents)
  .post(imageUploader.single("cover"), isAdmin, createEvent);

export default (() => Router().use("/events", isAuthorized, router))();
