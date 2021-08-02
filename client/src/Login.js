import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { login } from "./store/utils/thunkCreators";
import Layout from "./components/Layout";

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
  const { user, login } = props;
  const classes = useStyles();

  if (user.id) {
    return <Redirect to="/home" />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  const buttonProps = {
    type: "submit",
    variant: "contained",
    size: "large",
    className: classes.button,
  };

  const formProps = {
    onSubmit: handleLogin,
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
            Welcome back!
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item container justifyContent="center">
            <Button {...buttonProps}>Login</Button>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
