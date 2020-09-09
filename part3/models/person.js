const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

console.log(`connecting to ${url}`);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(`error connecting to MongoDB: ${err.message}`);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    minlength: 8,
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
