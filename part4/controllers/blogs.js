const express = require("express");
const Blog = require("./../models/blog");

const router = express.Router();

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

router.put("/", async (request, response) => {
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(blog.id, blog, {
    new: true,
    runValidators: true,
  });
  response.status(200).json(updatedBlog);
});

module.exports = router;
