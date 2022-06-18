import { baseUrl } from ".";
import Request from "../api/request";

const notifyAll = async (eventId: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/notifications/notify-all`, {
      eventId,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const notifyFollowers = async (eventId: any) => {
  try {
    const { data } = await Request.post(
      `${baseUrl}/notifications/notify-followers`,
      { eventId }
    );

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const NotificationsService = {
  notifyAll,
  notifyFollowers,
};

export default NotificationsService;
