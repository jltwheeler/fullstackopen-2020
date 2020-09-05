import React from "react";

const Person = ({ id, name, number, onDeleteClick }) => {
  return (
    <p key={name}>
      {name} {number}{" "}
      <button
        onClick={() => {
          onDeleteClick(id, name);
        }}
      >
        Delete
      </button>
    </p>
  );
};

export default Person;
