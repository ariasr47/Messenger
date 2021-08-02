import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MobileAppBar from "./MobileAppBar";
import DesktopAppBar from "./DesktopBar";
import Banner from "./Banner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row-reverse",
    },
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
  },
  formContainer: {
    flexGrow: 1,
    flexDirection: "column",
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item container md={8} lg={9} className={classes.mainContainer}>
        <MobileAppBar />
        <DesktopAppBar />
        <Grid item container className={classes.formContainer}>
          {props.children}
        </Grid>
      </Grid>
      <Grid item container md={4} lg={3} className={classes.banner}>
        <Banner />
      </Grid>
    </Grid>
  );
};

export default Layout;
