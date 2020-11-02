import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import "./App.css";
import BlogPage from "./components/BlogPage";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Users from "./components/Users";
import { initBlogs } from "./reducers/blogReducer";
import { getUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <Container>
        <Header />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/blogs/:id">
            <BlogPage />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
