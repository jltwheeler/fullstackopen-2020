import loginService from "./../services/login";
import blogService from "./../services/blogs";

const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
const initialState = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;

export const loginNewUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });

    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    blogService.setToken(user.token);

    dispatch({
      type: "LOG_IN",
      data: user,
    });
  };
};

export const logoutUser = () => {
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
