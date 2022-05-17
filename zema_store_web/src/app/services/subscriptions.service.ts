import { baseUrl } from ".";
import Request from "../api/request";

const getSubscriptions = async () => {
  // const { data: response } = await Request.get(`${baseUrl}/subscriptions`);
  const data = [
    {
      id: "3234234234",
      title: "John Doe",
      summary: "Sample summary",
      cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(1).png",
      price: "Ethiopia",
      subType: "Addis Ababa",
      createdAt: "2020-01-01",
    },
    {
      id: "1232322323234",
      title: "John Doe",
      summary: "some thing Doe",
      cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
      price: "Ethiopia",
      subType: "Addis Ababa",
      createdAt: "2020-01-01",
    },
    {
      id: "1wef3232423423423",
      title: "John Doe",
      summary: "some thing Doe",
      cover: "https://cdn.tuk.dev/assets/templates/olympus/projects(2).png",
      price: "Ethiopia",
      subType: "Addis Ababa",
      createdAt: "2020-01-01",
    },
  ];
  return { data };
};

const SubscriptionsService = {
  getSubscriptions,
};

export default SubscriptionsService;
