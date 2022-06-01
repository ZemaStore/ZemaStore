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

const addEvent = async (formData: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/events`, formData);
    // const data = {
    //   id: "23243234234234",
    //   fullName: "John Doe",
    //   avatar: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
    //   followers: 12,
    //   listenedHours: 4239,
    //   albumsCount: 21,
    //   songsCount: 21,
    //   createdAt: "2020-01-01",
    // };
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const updateEvent = async (id: string, formData: any) => {
  try {
    const { data } = await Request.patch(`${baseUrl}/events/${id}`, formData);
    return { data };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteEvent = async (id: any) => {
  try {
    // const { data } = await Request.delete(`${baseUrl}/events${id}`);
    const data = id;
    await setTimeout(() => {}, 1000);
    return { data };
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
