import { Button, Grid } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#b0b0b0",
    fontFamily: "Open Sans",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "19px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: theme.spacing(3.75) + "px",
  },
  buttonRoot: {
    borderRadius: "5px",
    background: "#ffffff",
    maxWidth: "170px",
    maxHeight: "51px",
    boxShadow: "0px 2px 12px rgba(74,106,149,0.2)",
    padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
  },
  buttonLabel: {
    color: "#3a8dff",
    minWidth: "max-content",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "19px",
    textAlign: "center",
  },
}));

const DesktopNavBarRoot = styled((props) => <Grid item container {...props} />)(
  ({ theme }) => ({
    paddingTop: theme.spacing(4) + "px",
    paddingRight: theme.spacing(5) + "px",

    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  })
);

const labelText = {
  login: "Dont have an account?",
  register: "Already have an account?",
};

const buttonText = {
  login: "Create account",
  register: "Login",
};

const url = {
  login: "/register",
  register: "/login",
};

const DesktopNavBar = (props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <DesktopNavBarRoot>
      <Grid item>
        <Grid item container>
          <Grid item className={classes.text}>
            {labelText[props.variant]}
          </Grid>
          <Grid item>
            <Button
              variant="text"
              size="large"
              onClick={() => history.push(url[props.variant])}
              classes={{
                root: classes.buttonRoot,
                label: classes.buttonLabel,
              }}
            >
              {buttonText[props.variant]}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DesktopNavBarRoot>
  );
};

export default DesktopNavBar;
