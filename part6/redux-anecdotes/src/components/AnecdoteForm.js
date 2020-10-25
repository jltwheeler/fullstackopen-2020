import React from "react";
import { useDispatch } from "react-redux";

import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;

    dispatch(createNewAnecdote(content));
    dispatch(setNotification(`Successfully added anecdote: ${content}`, 5));
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div>
        <input name="newAnecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
