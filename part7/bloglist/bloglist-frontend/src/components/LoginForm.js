import React from "react";
import { Button, TextField } from "@material-ui/core";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <TextField
        label="username"
        id="username"
        name="username"
        value={username}
        onChange={({ target }) => handleUsernameChange(target.value)}
      />
    </div>
    <div>
      <TextField
        label="password"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={({ target }) => handlePasswordChange(target.value)}
      />
    </div>
    <Button
      id="btn-login"
      type="submit"
      size="small"
      variant="contained"
      color="primary"
      onClick={handleLogin}
    >
      login
    </Button>
  </form>
);

LoginForm.displayName = "Login Form";

export default LoginForm;
