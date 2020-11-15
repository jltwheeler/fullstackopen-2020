import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const AuthorForm = ({ authors, setError }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = authors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name: selectedOption.value, year } });

    setName("");
    setYear("");
  };
  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={onSubmit}>
        <Select
          defaultvalue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
