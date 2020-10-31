import React, { useState } from "react";

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const buttonLabel = visible ? "hide" : "view";

  const handleAddLike = (event) => {
    event.preventDefault();

    addLike(blog);
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();

    deleteBlog(blog);
  };

  const displayBlog = {
    display: user.username === blog.user.username ? "" : "none",
  };

  if (visible) {
    return (
      <div className="blog" style={blogStyle}>
        <div className="blog__info">
          {blog.title} {blog.author}{" "}
        </div>
        <button className="btn-visible" onClick={() => setVisible(!visible)}>
          {buttonLabel}
        </button>
        <div>
          <p className="blog__url">{blog.url}</p>
          <p className="blog__likes">
            {blog.likes}{" "}
            <button className="btn-like" onClick={handleAddLike}>
              like
            </button>
          </p>
          <p className="blog__username">{blog.user.name}</p>
          <button style={displayBlog} onClick={handleDeleteBlog}>
            remove
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="blog" style={blogStyle}>
        <div className="blog__info">
          {blog.title} {blog.author}{" "}
        </div>
        <button className="btn-visible" onClick={() => setVisible(!visible)}>
          {buttonLabel}
        </button>
      </div>
    );
  }
};

Blog.displayName = "Blog";

export default Blog;
