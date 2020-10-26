import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  // const anecdotes = useSelector((state) => {
  //   if (state.filter) {
  //     return state.anecdotes.filter((val) =>
  //       val.content.includes(state.filter)
  //     );
  //   } else {
  //     return state.anecdotes;
  //   }
  // });

  // const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    // dispatch(voteForAnecdote(id));
    // dispatch(setNotification(`You voted for: ${content}`, 2));
    props.voteForAnecdote(id);
    props.setNotification(`You voted for: ${content}`, 5);
  };

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter((val) =>
        val.content.includes(state.filter)
      ),
    };
  } else {
    return { anecdotes: state.anecdotes };
  }
};

const mapDispatchToProps = {
  voteForAnecdote,
  setNotification,
};

// export default AnecdoteList;

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
