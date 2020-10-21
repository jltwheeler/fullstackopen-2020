import React from "react";
import { useDispatch } from "react-redux";

import { createNewAnectode } from "../reducers/anecdoteReducer";

const AnectodeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.newAnectode.value;

    dispatch(createNewAnectode(content));
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div>
        <input name="newAnectode" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnectodeForm;
