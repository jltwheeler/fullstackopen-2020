const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const voteForAnectode = (id) => {
  return {
    type: "VOTE",
    data: id,
  };
};

export const createNewAnectode = (content) => {
  return {
    type: "ADD_NEW",
    data: content,
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

const reducer = (state = initialState, action) => {
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
      const newAnectode = asObject(action.data);
      return [...state, newAnectode];
    default:
      return state;
  }

  return state;
};

export default reducer;
