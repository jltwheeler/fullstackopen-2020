import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommentForm from "./CommentForm";
import { likeBlog, removeBlog } from "./../reducers/blogReducer";

const BlogPage = ({ user }) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const blogs = useSelector((state) => state.blogs);

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const handleAddLike = (event) => {
    event.preventDefault();
    dispatch(likeBlog(blog));
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    dispatch(removeBlog(blog));
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

          <h2>Comments</h2>

          <CommentForm blogId={blog.id} />

          <ul>
            {blog.comments.map((comment) => {
              return <li key={comment.id}>{comment.comment}</li>;
            })}
          </ul>

          <button style={displayBlog} onClick={handleDeleteBlog}>
            remove
          </button>
        </div>
      </div>
    );
  }
};

export default BlogPage;
