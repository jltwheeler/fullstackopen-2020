import React from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell } from "@material-ui/core";

const Blog = ({ blog }) => {
  return (
    <TableRow className="blog">
      <TableCell className="blog__info">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
  );
};

Blog.displayName = "Blog";

export default Blog;
