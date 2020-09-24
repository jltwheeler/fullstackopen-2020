import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, updateBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const displayFull = { display: visible ? "" : "none" };
  const buttonLabel = visible ? "hide" : "view";

  const addLike = async (event) => {
    event.preventDefault();

    const idx = blogs.indexOf(blog);

    blogs[idx].likes += 1;
    updateBlogs([...blogs]);

    await blogService.update(blog.id, blogs[idx]);
  };

  const displayBlog = {
    display: user.username === blog.user.username ? "" : "none",
  };
  console.log(user.username);
  console.log(blog.user.username);
  const deleteBlog = async (event) => {
    event.preventDefault();

    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);

    await blogService.deleteBlog(blog.id);

    const idx = blogs.indexOf(blog);

    blogs.splice(idx, 1);
    updateBlogs([...blogs]);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
      <div style={displayFull}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button style={displayBlog} onClick={deleteBlog}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
