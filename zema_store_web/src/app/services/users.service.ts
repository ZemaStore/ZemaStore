import { baseUrl } from ".";
import Request from "../api/request";

const getUsers = async (currentPage: number, orderBy: string) => {
  const { data } = await Request.get(
    `${baseUrl}/users?page=${currentPage - 1}&sortBy=${orderBy}`
  );
  const res = {
    ...data,
    users: data.users.map(
      (user: { _id: any; profileId: { fullName: any } }) => {
        console.log("user is ", user.profileId);
        return {
          ...user,
          id: user._id,
          firstName: user.profileId?.fullName,
          lastName: user.profileId?.fullName,
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
  return { data: res };
};

const toggleUserStatus = async (userId: string) => {
  const { data } = await Request.patch(`${baseUrl}/users/status/${userId}`);
  return { data };
};

const updateUserProfile = async (userId: string) => {
  const { data } = await Request.patch(`${baseUrl}/users/profile/${userId}`);
  return { data };
};

const UsersService = {
  getUsers,
  toggleUserStatus,
  updateUserProfile,
};

export default UsersService;
