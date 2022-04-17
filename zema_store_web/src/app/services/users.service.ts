import Request from "../api/request";
const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

const getUsers = async () => {
  const { data } = await Request.get("/users");
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
