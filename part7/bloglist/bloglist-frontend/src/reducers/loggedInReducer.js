import loginService from "./../services/login";
import blogService from "./../services/blogs";
import { setNotification } from "./notificationReducer";

const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
const user = JSON.parse(loggedUserJSON);
const initialState = loggedUserJSON ? user : null;
if (user) {
  blogService.setToken(user.token);
}

export const loginNewUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      dispatch({
        type: "LOG_IN",
        data: user,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(
        setNotification(`Successfully logged in as ${username}`, "success")
      );
    } catch (error) {
      dispatch(setNotification("wrong username or password", "error"));
    }
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem("loggedBlogAppUser");
  return {
    type: "LOG_OUT",
  };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.data;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

export default loginReducer;
