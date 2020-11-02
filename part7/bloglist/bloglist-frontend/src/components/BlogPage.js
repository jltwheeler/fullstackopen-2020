import React from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbsUpAlt from "@material-ui/icons/ThumbUpAlt";

import CommentForm from "./CommentForm";
import { likeBlog, removeBlog } from "./../reducers/blogReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.loggedIn);

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

  const renderRemoveBtn = () => {
    if (user.username === blog.user.username) {
      return (
        <Button
          id="btn-login"
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          onClick={handleDeleteBlog}
        >
          remove
        </Button>
      );
    } else {
      return null;
    }
  };

  if (!blog) {
    return null;
  } else {
    if (user) {
      return (
        <div>
          <Typography variant="h5">{blog.title}</Typography>

          <div>
            <p className="blog__url">
              <Typography variant="body1">
                <a href={blog.url} target="_blank">
                  {blog.url}
                </a>
              </Typography>
            </p>
            <p className="blog__likes">
              <Typography variant="body1">{blog.likes} likes</Typography>
              <IconButton
                className="btn-like"
                color="primary"
                aria-label="like"
                onClick={handleAddLike}
              >
                <ThumbsUpAlt />
              </IconButton>
            </p>
            <Typography variant="body2" className="blog__username">
              added by {blog.user.name}
            </Typography>
            <br />

            <Typography variant="subtitle1">Comments</Typography>

            <CommentForm blogId={blog.id} />

            <List>
              {blog.comments.map((comment) => {
                return (
                  <ListItem key={comment.id}>
                    <ListItemIcon>
                      <CommentIcon />
                    </ListItemIcon>
                    <ListItemText>{comment.comment}</ListItemText>
                  </ListItem>
                );
              })}
            </List>

            {renderRemoveBtn()}
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
};

export default BlogPage;
