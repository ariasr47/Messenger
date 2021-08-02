import { AppBar, Tabs, Tab, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
};

const MobileAppBar = () => {
  const history = useHistory();
  const classes = useStyles();

  const tabValue = history.location.pathname === "/login" ? 0 : 1;

  return (
    <Grid
      item
      container
      component={AppBar}
      position="static"
      className={classes.root}
    >
      <Tabs variant="fullWidth" value={tabValue} aria-label="nav tabs example">
        <LinkTab
          label="Login"
          onClick={() => history.push("/login")}
          {...a11yProps(0)}
        />
        <LinkTab
          label="Register"
          onClick={() => history.push("/register")}
          {...a11yProps(1)}
        />
      </Tabs>
    </Grid>
  );
};

export default MobileAppBar;
