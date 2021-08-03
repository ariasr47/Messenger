import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { InputAdornment, TextField } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";

import Layout from "./components/Layout";
import Form from "./components/Form";
import { register } from "./store/utils/thunkCreators";

const Signup = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Layout variant="register">
      <Form onSubmit={handleRegister}>
        <Form.Label>Create an account.</Form.Label>
        <Form.Fields>
          <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {<PersonIcon />}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            aria-label="e-mail address"
            label="E-mail address"
            name="email"
            type="email"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {<EmailIcon />}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            aria-label="password"
            label="Password"
            name="password"
            type="password"
            required
            fullWidth
            InputProps={{
              minLength: 6,
              startAdornment: (
                <InputAdornment position="start">{<LockIcon />}</InputAdornment>
              ),
            }}
            error={!!formErrorMessage.confirmPassword}
            helperText={formErrorMessage.confirmPassword}
          />
          <TextField
            aria-label="confirm password"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            required
            InputProps={{
              minLength: 6,
              startAdornment: (
                <InputAdornment position="start">{<LockIcon />}</InputAdornment>
              ),
            }}
            error={!!formErrorMessage.confirmPassword}
            helperText={formErrorMessage.confirmPassword}
          />
        </Form.Fields>
        <Form.Actions justifyContent="center">
          <Form.Button>Create</Form.Button>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
