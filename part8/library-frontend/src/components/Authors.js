import React from "react";
import { useQuery } from "@apollo/client";

import AuthorForm from "./AuthorForm";
import { ALL_AUTHORS } from "../queries";

const Authors = ({ setError, show }) => {
  const result = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return (
      <div>
        <h2>authors</h2>
        <div>loading...</div>
      </div>
    );
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorForm authors={authors} setError={setError} />
    </div>
  );
};

export default Authors;
