import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { voteForAnectode } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnectodeList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((val) =>
        val.content.includes(state.filter)
      );
    } else {
      return state.anecdotes;
    }
  });

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, notification]);

  const vote = ({ id, content }) => {
    dispatch(voteForAnectode(id));
    dispatch(setNotification(content));
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

export default AnectodeList;
