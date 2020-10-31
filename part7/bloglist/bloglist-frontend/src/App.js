import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      dispatch(
        setNotification(`Successfully logged in as ${user.name}`, "success")
      );
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error"));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));

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

  const deleteBlog = async (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);

    await blogService.deleteBlog(blog.id);

    const idx = blogs.indexOf(blog);

    blogs.splice(idx, 1);
    setBlogs([...blogs]);
  };

  const addLike = async (blog) => {
    const idx = blogs.indexOf(blog);

    blogs[idx].likes += 1;
    setBlogs([...blogs]);

    await blogService.update(blogs[idx]);
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
    </div>
  );
};

export default App;
