import { baseUrl } from ".";
import Request from "../api/request";

const getEvents = async () => {
  // const { data } = await Request.get(`${baseUrl}/events`);
  const data = [
    {
      id: "1",
      title: "Event 1",
      summary: "Event 1 summary",
      cover:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      venue: {
        lat: 37.7749295,
        lng: -122.4194155,
        country: "United States",
        city: "San Francisco",
        street: "1 Market St",
        zip: "94105",
      },
      createdAt: "2018-01-01T00:00:00.000Z",
      startDate: "2018-01-01T00:00:00.000Z",
    },
  ];
  return { data };
};

const EventsService = {
  getEvents,
};

export default EventsService;
