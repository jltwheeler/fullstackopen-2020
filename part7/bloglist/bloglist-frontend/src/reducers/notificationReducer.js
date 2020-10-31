const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { alertType: action.alertType, message: action.message };
    case "REMOVE_NOTIFICATION":
      return {};
    default:
      return state;
  }
};

export const setNotification = (message, alertType) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      message,
      alertType,
    });

    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };
};

const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export default notificationReducer;
