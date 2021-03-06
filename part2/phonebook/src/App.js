import React, { useState, useEffect } from "react";

import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [alert, setAlert] = useState({ message: null, type: null });

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const peopleToShow = showAll
    ? persons
    : persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );

  const handleSearchChange = (event) => {
    setShowAll(false);
    setSearchText(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDeleteClick = (id, name) => {
    const result = window.confirm(`Delete ${name} ?`);

    if (result) {
      personService
        .deletePerson(id)
        .then((resp) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
  };

  const getPersonId = (name) => {
    return persons.filter((person) => person.name === name)[0].id;
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (result) {
        const updatedPerson = { name: newName, number: newNumber };
        const id = getPersonId(newName);
        personService
          .update(id, updatedPerson)
          .then((data) =>
            setPersons(
              persons.map((person) => (person.id !== data.id ? person : data))
            )
          )
          .catch((error) => {
            if (error.response.status === 400) {
              setAlert({ message: error.response.data.error, type: "error" });
            } else {
              setAlert({
                message: `Information of ${newName} has already been removed from server`,
                type: "error",
              });
              setPersons(persons.filter((person) => person.id !== id));
            }
            setTimeout(() => {
              setAlert({ message: null, type: null });
            }, 2000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          setAlert({ message: `Added ${newName}`, type: "success" });
        })
        .catch((err) => {
          setAlert({ message: err.response.data.error, type: "error" });
        });

      setTimeout(() => {
        setAlert({ message: null, type: null });
      }, 2000);

      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification alert={alert} />
      <Filter onTextChange={handleSearchChange} searchText={searchText} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default App;
