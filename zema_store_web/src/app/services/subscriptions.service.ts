import { baseUrl } from ".";
import Request from "../api/request";

const getSubscriptions = async (currentPage: number, orderBy: string) => {
  const { data } = await Request.get(`${baseUrl}/subscriptions?page=${currentPage - 1}&sortBy=${orderBy}`);

  return { data };
};

const SubscriptionsService = {
  getSubscriptions,
};

export default SubscriptionsService;
