const express = require("express");
const morgan = require("morgan");
const { token } = require("morgan");

morgan.token("person", (req) => {
  return JSON.stringify(req.body);
});

const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const getPersonByRequestId = (req) => {
  const id = Number(req.params.id);
  let person = persons.find((person) => person.id === id);

  return person;
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// Middlewares
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  let person = getPersonByRequestId(req);

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.post("/api/persons", (req, res) => {
  const newId = Math.floor(Math.random() * 1000);

  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = { id: newId, name: body.name, number: body.number };
  persons = persons.concat(person);

  res.status(200).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  let person = getPersonByRequestId(req);

  if (person) {
    console.log(`${person} has been deleted`);
    res.status(204).end();
  } else {
    res
      .status(404)
      .json({ error: "Person could not be deleted, as person not found" });
  }
});

app.get("/info", (req, res) => {
  res.status(200).send(
    `<p>Phonebook has info for ${persons.length} people</p>
        ${new Date()}
    `
  );
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
