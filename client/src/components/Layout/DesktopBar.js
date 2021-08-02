import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  label: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingRight: "1rem",
    opacity: 0.48,
  },
  button: {
    color: "#3A8DFF",
    backgroundColor: "inherit",
    padding: "1rem 2rem 1rem 2rem",
  },
}));

const DesktopAppBar = (props) => {
  const history = useHistory();
  const classes = useStyles();

  let labelText = "";
  let buttonText = "";
  let handleClick = () => null;

  if (history.location.pathname === "/login") {
    labelText = "Dont have an account?";
    buttonText = "Create account";
    handleClick = () => history.push("/register");
  } else if (
    history.location.pathname === "/register" ||
    history.location.pathname === "/"
  ) {
    labelText = "Already have an account?";
    buttonText = "Login";
    handleClick = () => history.push("/login");
  }

  return (
    <Grid item container className={classes.root}>
      <Typography component="span" className={classes.label}>
        {labelText}
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleClick}
        className={classes.button}
      >
        {buttonText}
      </Button>
    </Grid>
  );
};

export default DesktopAppBar;
