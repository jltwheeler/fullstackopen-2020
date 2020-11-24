import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS, GET_ME } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const resultUser = useQuery(GET_ME);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!resultUser.loading) {
      const favoriteGenre = resultUser.data.me.favoriteGenre;
      if (favoriteGenre) {
        setFilter(favoriteGenre);
      }
    }
  }, [resultUser.loading]);

  if (!props.show) {
    return null;
  }

  if (result.loading || resultUser.loading) {
    return (
      <div>
        <h2>books</h2>
        <div>loading...</div>
      </div>
    );
  }

  const books = result.data.allBooks;
  const genres = books.reduce(
    (prev, curr) => {
      const newGenres = curr.genres.filter((v) => !prev.includes(v));
      if (newGenres) {
        return [...prev, ...newGenres];
      }
    },
    ["all"]
  );

  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.value === "all") {
      setFilter("");
    } else {
      setFilter(event.target.value);
    }
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((v) => v.genres.includes(filter) || filter === "")
            .map((v) => (
              <tr key={v.title}>
                <td>{v.title}</td>
                <td>{v.author.name}</td>
                <td>{v.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => {
          return (
            <button value={genre} key={genre} onClick={handleClick}>
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
