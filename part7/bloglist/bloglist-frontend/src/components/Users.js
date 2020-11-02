import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

const Users = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.loggedIn);

  if (user) {
    return (
      <div>
        <Typography variant="h5">Users</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>Blogs Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
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
};

export default Users;
