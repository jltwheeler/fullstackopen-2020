import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";

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
      <div>
        <TextField
          label="comment"
          id="comment"
          name="comment"
          value={comment}
          onChange={handleChange}
        />
      </div>
      <Button
        id="btn-login"
        type="submit"
        size="small"
        variant="contained"
        color="primary"
      >
        Add comment
      </Button>
    </form>
  );
};

export default CommentForm;
