import React, { useState, useEffect } from "react";
import {
  useQuery,
  useLazyQuery,
  useSubscription,
  useApolloClient,
} from "@apollo/client";

import { ALL_BOOKS, BOOK_ADDED, GET_ME } from "../queries";

const Books = (props) => {
  const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS);
  const resultUser = useQuery(GET_ME);
  const result = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);

  const client = useApolloClient();

  useEffect(() => {
    if (!resultUser.loading) {
      const favoriteGenre = resultUser.data.me?.favoriteGenre;

      if (favoriteGenre) {
        getBooks({ variables: { genre: favoriteGenre } });
      }
    }
  }, [resultUser.loading]);

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks);
    }
  }, [resultBooks]);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map((p) => p.id).includes(object.id);
    };

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded;
      window.alert(`A new book ${newBook.title} has been added!`);
      updateCacheWith(newBook);
    },
  });

  if (result.loading) {
    return (
      <div>
        <h2>books</h2>
        <div>loading...</div>
      </div>
    );
  }

  const genres = result.data.allBooks.reduce(
    (prev, curr) => {
      const newGenres = curr.genres.filter((v) => !prev.includes(v));
      if (newGenres) {
        return [...prev, ...newGenres];
      }
    },
    ["all"]
  );

  const handleClick = (event) => {
    if (event.target.value === "all") {
      getBooks();
    } else {
      getBooks({ variables: { genre: event.target.value } });
    }
  };

  if (!props.show) {
    return null;
  }

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
          {books.map((v) => (
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
