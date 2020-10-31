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
        id="username"
        name="username"
        value={username}
        onChange={({ target }) => handleUsernameChange(target.value)}
      ></input>
    </div>
    <div>
      password
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={({ target }) => handlePasswordChange(target.value)}
      ></input>
    </div>
    <button id="btn-login" type="submit">
      login
    </button>
  </form>
);

LoginForm.displayName = "Login Form";

export default LoginForm;
