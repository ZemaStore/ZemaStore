import { baseUrl } from ".";
import Request from "../api/request";

const getUsers = async () => {
  const { data } = await Request.get(`${baseUrl}/users`);
  return { data };
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
