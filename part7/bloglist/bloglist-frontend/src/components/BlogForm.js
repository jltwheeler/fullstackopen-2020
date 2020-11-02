import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <Typography variant="h5">Create a new blog</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="Title"
            id="title"
            className="blog-form__title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <TextField
            label="Author"
            id="author"
            className="blog-form__author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <TextField
            label="URL"
            id="url"
            className="blog-form__url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <Button type="submit" size="small" variant="contained" color="primary">
          create
        </Button>
      </form>
    </div>
  );
};

BlogForm.displayName = "Blog Form";

export default BlogForm;
