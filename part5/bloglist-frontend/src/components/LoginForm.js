import React from "react";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        name="username"
        value={username}
        onChange={({ target }) => handleUsernameChange(target.value)}
      ></input>
    </div>
    <div>
      password
      <input
        type="password"
        name="password"
        value={password}
        onChange={({ target }) => handlePasswordChange(target.value)}
      ></input>
    </div>
    <button type="submit">login</button>
  </form>
);

export default LoginForm;
