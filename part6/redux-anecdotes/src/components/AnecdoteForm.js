import React from "react";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;

    props.createNewAnecdote(content);
    props.setNotification(`Successfully added anecdote: ${content}`, 5);
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

const mapDispatchToProps = {
  createNewAnecdote,
  setNotification,
};

// export default AnecdoteForm;

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
