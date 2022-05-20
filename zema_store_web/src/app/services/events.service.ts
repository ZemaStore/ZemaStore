import { baseUrl } from ".";
import Request from "../api/request";

const getEvents = async () => {
  const { data } = await Request.get(`${baseUrl}/events`);

  return { data };
};

const EventsService = {
  getEvents,
};

export default EventsService;
