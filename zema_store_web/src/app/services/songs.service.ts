import { baseUrl } from ".";
import Request from "../api/request";

const getSongs = async () => {
  const { data: response } = await Request.get(`${baseUrl}/songs`);
  const data = response.map(
    (user: { _id: any; profileId: { fullName: any } }) => {
      return {
        ...user,
        id: user._id,
        fullName: user.profileId?.fullName,
        isActive: true,
        avatar: "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
        subType: {
          subscriptionType: "free",
          subscriptionId: "free-subscription",
          summary: "Free Subscription",
          price: 0,
        },
        address: {
          country: "Ethiopia",
          city: "Addis Ababa",
          street: "Kenya",
          zip: "12345",
        },
        createdAt: "2020-01-01",
      };
    }
  );
  return { data };
};

const SongsService = {
  getSongs,
};

export default SongsService;
