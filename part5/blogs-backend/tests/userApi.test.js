const bcrypt = require("bcrypt");
const User = require("../models/user");
const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");

const api = supertest(app);

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

describe("When there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "jeff_winger",
      name: "Jeff Winger",
      password: "lawyersarecool",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if user name is too short", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: "bo",
      name: "John Doe",
      password: "password",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    expect(result.body.error).toContain(
      "shorter than the minimum allowed length (3)"
    );

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  afterAll(() => {
    mongoose.connection.close();
  });

  test("creation fails if password is too short", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: "tester",
      name: "John Doe",
      password: "d",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    expect(result.body.error).toContain(
      "Password must be at least 3 characters long"
    );

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});