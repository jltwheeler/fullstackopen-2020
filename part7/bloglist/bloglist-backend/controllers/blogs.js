const express = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("./../models/blog");
const User = require("./../models/user");

const router = express.Router();

router.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments");
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const userId = blog.user;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (
    !request.token ||
    !decodedToken.id ||
    decodedToken.id !== String(userId)
  ) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const updates = request.body;
  const blog = await Blog.findById(request.params.id).populate("user");

  const updatedBlog = await Blog.findByIdAndUpdate(blog.id, updates, {
    new: true,
    runValidators: true,
  });
  response.status(200).json(updatedBlog);
});

module.exports = router;
