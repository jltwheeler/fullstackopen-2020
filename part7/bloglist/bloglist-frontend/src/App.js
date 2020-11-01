import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Switch,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import {
  initBlogs,
  createBlog,
  removeBlog,
  likeBlog,
} from "./reducers/blogReducer";
import {
  loginNewUser,
  loginRememberedUser,
  logoutUser,
} from "./reducers/loggedInReducer";
import { getUsers } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.loggedIn);
  const users = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      dispatch(loginRememberedUser(JSON.parse(loggedUserJSON)));
    }
  }, [dispatch]);

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
      <h2>Blogs</h2>

      <Notification alert={notification} />

      <Switch>
        <Route path="/users">
          {user === null ? (
            loginForm()
          ) : (
            <div>
              <p>{user.name} is logged-in</p>
              <button onClick={handleLogout}>logout</button>

              <Users users={users} />
            </div>
          )}
        </Route>
        <Route path="/">
          {user === null ? (
            loginForm()
          ) : (
            <div>
              <p>{user.name} is logged-in</p>
              <button onClick={handleLogout}>logout</button>

              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  addLike={addLike}
                  deleteBlog={deleteBlog}
                />
              ))}
            </div>
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
