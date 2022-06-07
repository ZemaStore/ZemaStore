import { baseUrl } from ".";
import Request from "../api/request";

const getEvents = async (currentPage: number, orderBy: string) => {
  const { data } = await Request.get(
    `${baseUrl}/events?page=${currentPage - 1}&sortBy=${orderBy}`
  );
  // const data = [
  //   {
  //     id: "1",
  //     title: "Event 1",
  //     summary: "Event 1 summary",
  //     cover:
  //       "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  //     venue: {
  //       lat: 37.7749295,
  //       lng: -122.4194155,
  //       country: "United States",
  //       city: "San Francisco",
  //       street: "1 Market St",
  //       zip: "94105",
  //     },
  //     createdAt: "2018-01-01",
  //     endDate: "2018-04-01",
  //     startDate: "2018-02-01",
  //   },
  // ];
  return { data };
};

const addEvent = async (formData: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/events`, formData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const updateEvent = async (id: string, formData: any) => {
  try {
    const { data } = await Request.patch(`${baseUrl}/events/${id}`, formData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteEvent = async (id: any) => {
  try {
    const { data } = await Request.delete(`${baseUrl}/events/${id}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const EventsService = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};

export default EventsService;
