import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import LoginForm from "./LoginForm";
import Togglable from "./Togglable";
import { createBlog } from "../reducers/blogReducer";
import { loginNewUser } from "../reducers/loggedInReducer";
import { setNotification } from "../reducers/notificationReducer";

const HomePage = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.loggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginNewUser(username, password));
    setUsername("");
    setPassword("");
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={setUsername}
          handlePasswordChange={setPassword}
          username={username}
          password={password}
        />
      </Togglable>
    );
  };

  const addBlog = (newBlog) => {
    try {
      dispatch(createBlog(newBlog));

      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added!`,
          "success"
        )
      );

      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
