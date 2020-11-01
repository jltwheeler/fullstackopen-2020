import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.users);
  const match = useRouteMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  console.log(users);

  if (user) {
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
    return null;
  }
};

export default User;
