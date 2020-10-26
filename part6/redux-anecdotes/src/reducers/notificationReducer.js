let notificationId = 0;

const notificationReducer = (
  state = { content: "", id: notificationId },
  action
) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { content: action.content, id: action.id };
    case "REMOVE_NOTIFICATION":
      if (state.id === action.id) {
        return { notification: "" };
      }
      return state;
    default:
      return state;
  }
};

export const setNotification = (notification, timeoutSecs) => {
  return async (dispatch) => {
    const id = notificationId++;
    console.log(id);
    dispatch({
      type: "SET_NOTIFICATION",
      content: notification,
      id,
    });

    setTimeout(() => dispatch(removeNotification(id)), timeoutSecs * 1000);
  };
};

export const removeNotification = (id) => {
  return {
    type: "REMOVE_NOTIFICATION",
    id,
  };
};

export default notificationReducer;
