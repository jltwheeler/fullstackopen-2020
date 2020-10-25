import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = {
    content,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateOne = async (id) => {
  const url = `${baseUrl}/${id}`;
  const response = await axios.get(url);
  const anecdote = response.data;

  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const putResponse = await axios.put(url, updatedAnecdote);
  return putResponse.data;
};

export default { getAll, createNew, updateOne };
