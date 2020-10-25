import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((val) =>
        val.content.includes(state.filter)
      );
    } else {
      return state.anecdotes;
    }
  });

  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(voteForAnecdote(id));
    dispatch(setNotification(`You voted for: ${content}`, 2));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
