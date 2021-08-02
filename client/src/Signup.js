import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  InputAdornment,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import Layout from "./components/Layout";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#3A8DFF",
    color: "white",
    padding: "0.5rem 3rem 0.5rem 3rem",
    marginTop: "1rem",
  },
  formLabel: {
    fontWeight: 600,
  },
  form: {
    [theme.breakpoints.up("sm")]: {
      width: "400px",
    },
    flexDirection: "column",
    margin: "auto",
    "& .MuiGrid-item": {
      padding: "1rem",
    },
  },
}));

const Login = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

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

  const buttonProps = {
    type: "submit",
    variant: "contained",
    size: "large",
    className: classes.button,
  };

  const formProps = {
    onSubmit: handleRegister,
    className: classes.form,
  };

  const typographyProps = {
    variant: "h5",
    className: classes.formLabel,
  };

  return (
    <Layout>
      <form {...formProps}>
        <Grid container direction="column" spacing={2}>
          <Grid item component={Typography} {...typographyProps}>
            Create an account.
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
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
                  <InputAdornment position="start">
                    {<LockIcon />}
                  </InputAdornment>
                ),
              }}
              error={!!formErrorMessage.confirmPassword}
              helperText={formErrorMessage.confirmPassword}
            />
          </Grid>
          <Grid item>
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
                  <InputAdornment position="start">
                    {<LockIcon />}
                  </InputAdornment>
                ),
              }}
              error={!!formErrorMessage.confirmPassword}
              helperText={formErrorMessage.confirmPassword}
            />
          </Grid>
          <Grid item container justifyContent="center">
            <Button {...buttonProps}>Create</Button>
          </Grid>
        </Grid>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
