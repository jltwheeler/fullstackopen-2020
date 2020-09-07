require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

morgan.token("person", (req) => {
  return JSON.stringify(req.body);
});

const app = express();

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(err);
};

// Middlewares
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.status(200).json(persons));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  const person = new Person({ name: body.name, number: body.number });

  person.save().then((savedPerson) => {
    res.status(200).json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
  })
    .then((updatedPerson) => {
      res.status(200).json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).send(
      `<p>Phonebook has info for ${persons.length} people</p>
        ${new Date()}
    `
    );
  });
});

// Handler of requests with unkown endpint
app.use(unknownEndpoint);

// Handler of requests with result to errors
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
