import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.loggedIn);

  if (user) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Users;
