const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./testHelper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(
    (blogObject) => new Blog(blogObject)
  );
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
      await api.post("/api/blogs").send(helper.newBlog)
    ).body;
    delete responseBlog.id;

    expect(responseBlog).toEqual(helper.newBlog);
  });

  test("missing likes property sets likes to 0 by default", async () => {
    const responseBlog = (
      await api.post("/api/blogs").send(helper.newBlogNoLike)
    ).body;

    expect(responseBlog.likes).toBe(0);
  });

  test("missing title and url properties result in a 400 status", async () => {
    const response = await api.post("/api/blogs").send(helper.newBlogInvalid);

    expect(response.status).toBe(400);
  });
});

describe("deleting a blog", () => {
  test("delete a single blog post", async () => {
    const initResponse = await api.get("/api/blogs");
    const id = initResponse.body[0].id;

    const response = await api.delete(`/api/blogs/${id}`);
    expect(response.status).toBe(204);
  });
});

describe("updating a blog", () => {
  test("updating information of a single blog post", async () => {
    const initResponse = await api.get("/api/blogs");

    const updatedBlog = initResponse.body[0];
    updatedBlog.likes += 100;

    const response = await api.put("/api/blogs").send(updatedBlog);
    expect(response.body).toEqual(updatedBlog);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
