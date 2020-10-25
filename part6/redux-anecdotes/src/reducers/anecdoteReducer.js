import anecdoteService from "../services/anecdotes";

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.updateOne(id);
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "VOTE",
      data: anecdotes,
    });
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "ADD_NEW",
      data: anecdote,
    });
  };
};

const orderByVotes = (anecdotes) => {
  const compare = (a, b) => {
    if (a.votes < b.votes) {
      return 1;
    }
    if (a.votes > b.votes) {
      return -1;
    }
    return 0;
  };

  return [...anecdotes].sort(compare);
};

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_STATE",
      data: anecdotes,
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return orderByVotes(action.data);
    case "ADD_NEW":
      return [...state, action.data];
    case "INIT_STATE":
      return orderByVotes(action.data);
    default:
      return state;
  }
};

export default reducer;
