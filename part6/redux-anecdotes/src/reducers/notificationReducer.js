const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const setNotification = (notification, timeoutSecs) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });

    console.log(timeoutSecs * 1000);

    setTimeout(() => dispatch(removeNotification()), timeoutSecs * 1000);
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export default notificationReducer;
