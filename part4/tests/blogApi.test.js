const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./testHelper");

const api = supertest(app);
let token;

beforeEach(async () => {
  await Blog.deleteMany({});

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  const savedUser = await user.save();

  token = `bearer ${await (
    await api.post("/api/login").send({ username: "root", password: "sekret" })
  ).body.token}`;

  const blogObjects = helper.initialBlogs.map((blogObject) => {
    blogObject.user = savedUser._id;
    return new Blog(blogObject);
  });
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

describe("getting a new blog", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the unique id of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("creating a new blog", () => {
  test("that a post request successfully creates a new blog post", async () => {
    const responseBlog = await (
      await await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(helper.newBlog)
    ).body;
    delete responseBlog.id;
    delete responseBlog.user;

    expect(responseBlog).toEqual(helper.newBlog);
  });

  test("missing likes property sets likes to 0 by default", async () => {
    const responseBlog = await (
      await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(helper.newBlogNoLike)
    ).body;

    expect(responseBlog.likes).toBe(0);
  });

  test("missing title and url properties result in a 400 status", async () => {
    const response = await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(helper.newBlogInvalid);

    expect(response.status).toBe(400);
  });

  test("Adding a blog fails when no tokens are provided", async () => {
    const response = await api.post("/api/blogs").send(helper.newBlog);

    expect(response.status).toBe(401);
  });
});

describe("deleting a blog", () => {
  test("delete a single blog post", async () => {
    const initResponse = await api.get("/api/blogs");
    const id = initResponse.body[0].id;

    const response = await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", token);
    expect(response.status).toBe(204);
  });
});

describe("updating a blog", () => {
  test("updating information of a single blog post", async () => {
    const initResponse = await api.get("/api/blogs");

    const updatedBlog = initResponse.body[0];
    updatedBlog.likes += 100;
    delete updatedBlog.user;

    const response = await api
      .put("/api/blogs")
      .set("Authorization", token)
      .send(updatedBlog);
    delete response.body.user;
    expect(response.body).toEqual(updatedBlog);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
