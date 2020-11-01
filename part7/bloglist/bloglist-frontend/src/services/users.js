import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const users = await request.then((response) => response.data);

  return users;
};

export default { getAll };
