import React from "react";

const Filter = ({ onTextChange, searchText }) => {
  return (
    <div>
      filter show with: <input onChange={onTextChange} value={searchText} />
    </div>
  );
};

export default Filter;
