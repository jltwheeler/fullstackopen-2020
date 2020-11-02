import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const blogs = await request.then((response) => response.data);

  return blogs.sort((a, b) => b.likes - a.likes);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return response.data;
};

const update = async (id, updateObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, deleteBlog, addComment, setToken };
