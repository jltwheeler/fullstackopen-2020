import loginService from "./../services/login";
import blogService from "./../services/blogs";

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

export const loginRememberedUser = (user) => {
  blogService.setToken(user.token);
  return {
    type: "RE_LOG_IN",
    data: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOG_OUT",
  };
};

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.data;
    case "RE_LOG_IN":
      return action.data;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

export default loginReducer;
