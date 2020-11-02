import React from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.users);
  const loggedIn = useSelector((state) => state.loggedIn);
  const match = useRouteMatch("/users/:id");

  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (user) {
    if (loggedIn) {
      return (
        <div>
          <h2>{user.name}</h2>
          <h3>Added Blogs</h3>
          <ul>
            {user.blogs.map((blog) => {
              return <li key={blog.id}>{blog.title}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return null;
  }
};

export default User;
