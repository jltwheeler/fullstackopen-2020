import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AnectodeForm from "./components/AnecdoteForm";
import AnectodeList from "./components/AnectodeList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initialiseAnectodes } from "./reducers/anecdoteReducer";
import anectodeService from "./services/anectodes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anectodeService.getAll().then((anectodes) => {
      dispatch(initialiseAnectodes(anectodes));
    });
  }, [dispatch]);

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
