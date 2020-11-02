const express = require("express");
const jwt = require("jsonwebtoken");

const Blog = require("./../models/blog");
const Comment = require("./../models/comment");

const router = express.Router();

router.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("comments");

  response.json(blog);
});

router.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    comment: body.comment,
    blog: blog._id,
  });

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = router;
