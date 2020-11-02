import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
    <header>
      <h2>Blogs</h2>

      <Notification />

      {user && (
        <div>
          <p>{user.name} is logged-in</p>
          <button onClick={handleClick}>logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
