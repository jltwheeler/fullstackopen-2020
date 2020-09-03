import React from "react";

const PersonForm = ({
  addPerson,
  name,
  number,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={onNameChange} value={name} />
      </div>
      <div>
        number: <input onChange={onNumberChange} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
