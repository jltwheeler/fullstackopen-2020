import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Redirect, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import "./App.css";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogPage from "./components/BlogPage";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import {
  initBlogs,
  createBlog,
  removeBlog,
  likeBlog,
} from "./reducers/blogReducer";
import { loginNewUser, logoutUser } from "./reducers/loggedInReducer";
import { getUsers } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.loggedIn);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginNewUser(username, password));

      setUsername("");
      setPassword("");

      dispatch(
        setNotification(`Successfully logged in as ${username}`, "success")
      );
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error"));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(logoutUser());
  };

  const addBlog = async (newBlog) => {
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

  const deleteBlog = (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    dispatch(removeBlog(blog));
  };

  const addLike = (blog) => {
    dispatch(likeBlog(blog));
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

  return (
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
      />

      <Container>
        <h2>Blogs</h2>

        <Notification alert={notification} />

        {user && (
          <div>
            <p>{user.name} is logged-in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
        )}

        <Switch>
          <Route path="/blogs/:id">
            {user ? (
              <BlogPage user={user} addLike={addLike} deleteBlog={deleteBlog} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/users/:id">
            {user ? <User /> : <Redirect to="/" />}
          </Route>
          <Route path="/users">{user ? <Users /> : <Redirect to="/" />}</Route>
          <Route path="/">
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
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
