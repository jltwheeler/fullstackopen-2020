import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createComment } from "./../reducers/blogReducer";

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(blogId, comment));
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={comment}
        type="text"
        id="comment"
        name="comment"
        onChange={handleChange}
      ></input>
      <button id="btn-login" type="submit">
        add comment
      </button>
    </form>
  );
};

export default CommentForm;
