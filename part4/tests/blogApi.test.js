const { response } = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "test blog 1",
    author: "Jeff Winger",
    url: "https://www.blog.com/jeffwinger",
    likes: 27,
  },
  {
    title: "test blog 2",
    author: "Donald Glover",
    url: "https://www.blog.com/iamdonald",
    likes: 58,
  },
];

const newBlog = {
  title: "test blog 3",
  author: "Creator, Tyler",
  url: "https://www.blog.com/ofwgkta",
  likes: 10,
};

const newBlogNoLike = {
  title: "test blog 4",
  author: "No Likes",
  url: "https://www.blog.com/noonelikesme",
};

const newBlogInvalid = {
  author: "Creator, Tyler",
  likes: 10,
};

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blogObject) => new Blog(blogObject));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the unique id of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("that a post request successfully creates a new blog post", async () => {
  const responseBlog = await (await api.post("/api/blogs").send(newBlog)).body;
  delete responseBlog.id;

  expect(responseBlog).toEqual(newBlog);
});

test("missing likes property sets likes to 0 by default", async () => {
  const responseBlog = (await api.post("/api/blogs").send(newBlogNoLike)).body;

  expect(responseBlog.likes).toBe(0);
});

test("missing title and url properties result in a 400 status", async () => {
  const response = await api.post("/api/blogs").send(newBlogInvalid);

  expect(response.status).toBe(400);
});

afterAll(() => {
  mongoose.connection.close();
});
