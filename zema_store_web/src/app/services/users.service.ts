import { baseUrl } from ".";
import Request from "../api/request";

const getUsers = async () => {
  const { data } = await Request.get(`${baseUrl}/users`);
  const res = {
    ...data,
    users: data.users.map(
      (user: { _id: any; profileId: { fullName: any } }) => {
        return {
          ...user,
          id: user._id,
          fullName: user.profileId?.fullName,
          isActive: true,
          avatar:
            "https://cdn.tuk.dev/assets/templates/olympus/projects(3).png",
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
    ),
  };
  console.log(res, " is response");
  return { data: res };
};

const toggleUserStatus = async (userId: string) => {
  const { data } = await Request.patch(
    `${baseUrl}/users/${userId}/toggleStatus`
  );
  return { data };
};

const UsersService = {
  getUsers,
  toggleUserStatus,
};

export default UsersService;
