import React from "react";

import AnectodeForm from "./components/AnecdoteForm";
import AnectodeList from "./components/AnectodeList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnectodeList />
      <h2>create new</h2>
      <AnectodeForm />
    </div>
  );
};

export default App;
