import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createNewAnectode } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import anectodeService from "./../services/anectodes";

const AnectodeForm = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(removeNotification()), 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, notification]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.newAnectode.value;

    const newAnectode = await anectodeService.createNew(content);

    dispatch(createNewAnectode(newAnectode));
    dispatch(setNotification(content));
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
