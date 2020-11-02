import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notification.alertType === "error") {
    return (
      <div className="error" style={errorStyle}>
        {notification.message}
      </div>
    );
  } else if (notification.alertType === "success") {
    return (
      <div className="success" style={successStyle}>
        {notification.message}
      </div>
    );
  } else {
    return null;
  }
};

Notification.displayname = "Notification";

export default Notification;
