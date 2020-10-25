export const voteForAnectode = (id) => {
  return {
    type: "VOTE",
    data: id,
  };
};

export const createNewAnectode = (anectode) => {
  return {
    type: "ADD_NEW",
    data: anectode,
  };
};

const orderByVotes = (anectodes) => {
  const compare = (a, b) => {
    if (a.votes < b.votes) {
      return 1;
    }
    if (a.votes > b.votes) {
      return -1;
    }
    return 0;
  };

  return [...anectodes].sort(compare);
};

export const initialiseAnectodes = (anectodes) => {
  return {
    type: "INIT_STATE",
    data: anectodes,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const anectode = state.find((item) => item.id === action.data);
      const idx = state.indexOf(anectode);

      const updatedAnectode = { ...anectode, votes: anectode.votes + 1 };

      return orderByVotes([
        ...state.slice(0, idx),
        updatedAnectode,
        ...state.slice(idx + 1),
      ]);

    case "ADD_NEW":
      return [...state, action.data];
    case "INIT_STATE":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
