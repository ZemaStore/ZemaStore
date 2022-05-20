import { baseUrl } from ".";
import Request from "../api/request";

const getSubscriptions = async () => {
  const { data } = await Request.get(`${baseUrl}/subscriptions`);

  return { data };
};

const SubscriptionsService = {
  getSubscriptions,
};

export default SubscriptionsService;
