import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";

import Notification from "./Notification";
import { logoutUser } from "./../reducers/loggedInReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedIn);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <header style={{ margin: "1rem 0rem" }}>
      <Typography variant="h4">Blogs</Typography>

      <Notification />

      {user && (
        <div>
          <p></p>
          <Typography variant="subtitle1">{user.name} is logged-in</Typography>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleClick}
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
