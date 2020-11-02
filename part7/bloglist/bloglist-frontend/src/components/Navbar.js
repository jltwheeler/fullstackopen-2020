import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "./../reducers/loggedInReducer";

const Navbar = () => {
  const dipsatch = useDispatch();
  const user = useSelector((state) => state.loggedIn);

  const handleClick = (e) => {
    e.preventDefault();
    dipsatch(logoutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {user ? (
          <div>
            <em>{user.name} logged in</em>
            <Button color="inherit" onClick={handleClick}>
              logout
            </Button>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
