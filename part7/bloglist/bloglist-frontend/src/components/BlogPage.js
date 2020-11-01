import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogPage = ({ user, addLike, deleteBlog }) => {
  const match = useRouteMatch();
  const blogs = useSelector((state) => state.blogs);

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const handleAddLike = (event) => {
    event.preventDefault();
    addLike(blog);
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    deleteBlog(blog);
  };

  if (!blog) {
    return null;
  } else {
    const displayBlog = {
      display: user.username === blog.user.username ? "" : "none",
    };
    return (
      <div>
        <h1>{blog.title}</h1>

        <div>
          <p className="blog__url">
            <a href={blog.url} target="_blank">
              {blog.url}
            </a>
          </p>
          <p className="blog__likes">
            {blog.likes} likes
            <button className="btn-like" onClick={handleAddLike}>
              like
            </button>
          </p>
          <p className="blog__username">added by {blog.user.name}</p>
          <button style={displayBlog} onClick={handleDeleteBlog}>
            remove
          </button>
        </div>
      </div>
    );
  }
};

export default BlogPage;
