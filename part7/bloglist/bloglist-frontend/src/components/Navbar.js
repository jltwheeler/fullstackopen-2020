import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";

const Navbar = ({ user, handleLogout, handleLogin }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {user ? (
          <div>
            <em>{user.name} logged in</em>
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
