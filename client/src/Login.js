import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, InputAdornment } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import Layout from "./components/Layout";
import Form from "./components/Form";

import { login } from "./store/utils/thunkCreators";

const Login = (props) => {
  const { user, login } = props;

  if (user.id) {
    return <Redirect to="/home" />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  return (
    <Layout variant="login">
      <Form onSubmit={handleLogin}>
        <Form.Label>Welcome back!</Form.Label>
        <Form.Fields>
          <TextField
            label="Username"
            aria-label="username"
            name="username"
            type="text"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            aria-label="password"
            name="password"
            type="password"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Form.Fields>
        <Form.Actions justifyContent="center">
          <Form.Button>Login</Form.Button>
        </Form.Actions>
      </Form>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
