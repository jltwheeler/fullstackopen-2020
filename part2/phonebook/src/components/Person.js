import React from "react";

const Person = ({ name, number }) => {
  return (
    <p key={name}>
      {name} {number}
    </p>
  );
};

export default Person;
