import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("books");

  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
      ? localStorage.getItem("library-user-token")
      : null
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />

      <LoginForm
        setError={setErrorMessage}
        setToken={setToken}
        show={page === "login"}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
