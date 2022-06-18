import { baseUrl } from ".";
import Request from "../api/request";

const getSubscription = async (id: string) => {
  try {
    const { data } = await Request.get(`${baseUrl}/subscriptions/${id}`);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const getSubscriptions = async (currentPage: number, orderBy: string) => {
  const { data } = await Request.get(
    `${baseUrl}/subscriptions?page=${currentPage - 1}&sortBy=${orderBy}`
  );

  // const data = {
  //   subscriptions: [
  //     {
  //       id: "13323455232",
  //       title: "John Doe",
  //       price: "$70",
  //       subType: "monthly",
  //       fromDate: "2020-01-01",
  //       toDate: "2020-01-31",
  //       summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       price_id: "asfwasfwsvasf",
  //       createdAt: "2020-01-31"
  //     },
  //     {
  //       id: "23323455222",
  //       title: "John Doe",
  //       price: "$10",
  //       subType: "monthly",
  //       fromDate: "2020-01-01",
  //       toDate: "2020-01-31",
  //       summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       price_id: "asfwasfwsvasf",
  //       createdAt: "2020-02-31"

  //     },
  //   ],
  //   totalPages: 2,
  //   totalItems: 2,
  //   pageNumber: 1,
  //   limit: 10,
  // };

  return { data };
};

const addSubscription = async (formData: any) => {
  try {
    const { data } = await Request.post(`${baseUrl}/subscriptions`, formData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const updateSubscription = async (id: string, formData: any) => {
  try {
    console.log(formData, "formData");
    const { data } = await Request.patch(
      `${baseUrl}/subscriptions/${id}`,
      formData
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const deleteSubscription = async (id: any) => {
  try {
    const { data } = await Request.delete(`${baseUrl}/subscriptions/${id}`);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const SubscriptionsService = {
  getSubscription,
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};

export default SubscriptionsService;
