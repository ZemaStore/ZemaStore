import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.controllers";
import { imageUploader } from "../middlewares/multer.middlewares";

const router = Router();

router
  .route("/:id")
  .get(getEvent)
  .patch(imageUploader.single("cover"), updateEvent)
  .delete(deleteEvent);

router
  .route("/")
  .get(getEvents)
  .post(imageUploader.single("cover"), createEvent);

export default (() => Router().use("/events", router))();
