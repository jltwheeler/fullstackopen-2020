import React from "react";

const Notification = ({ alert }) => {
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

  if (alert.type === "error") {
    return (
      <div className="error" style={errorStyle}>
        {alert.message}
      </div>
    );
  } else if (alert.type === "success") {
    return (
      <div className="success" style={successStyle}>
        {alert.message}
      </div>
    );
  } else {
    return null;
  }
};

Notification.displayname = "Notification";

export default Notification;
