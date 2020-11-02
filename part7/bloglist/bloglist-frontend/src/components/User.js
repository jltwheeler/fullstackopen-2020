import React from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

const User = () => {
  const users = useSelector((state) => state.users);
  const loggedIn = useSelector((state) => state.loggedIn);
  const match = useRouteMatch("/users/:id");

  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (user) {
    if (loggedIn) {
      return (
        <div>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="subtitle1">Added Blogs</Typography>

          <TableContainer>
            <Table>
              <TableBody>
                {user.blogs.map((blog) => {
                  return (
                    <TableRow key={blog.id}>
                      <TableCell>{blog.title}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return null;
  }
};

export default User;
