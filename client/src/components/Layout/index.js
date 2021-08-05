import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Bubble } from "../../images/bubble.svg";

import MobileNavBar from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    width: "269px",
    height: "186px",
    justifyContent: "center",
    alignContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row-reverse",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "75%",
    },
  },
  text: {
    height: "80px",
    color: theme.palette.primary.contrastText,
    fontSize: "26px",
    fontWeight: 400,
    lineHeight: "40px",
    textAlign: "center",
  },
}));

const BannerRoot = styled((props) => <Grid item container {...props} />)(
  ({ theme }) => ({
    backgroundImage: `linear-gradient(rgba(58,157,255, 0.85),  rgba(134,185,255, 0.85)), url(/bg-img.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      maxHeight: "300px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "425px",
      maxHeight: "100%",
    },
  })
);

const LayoutRoot = styled((props) => <Grid container {...props} />)(
  ({ theme }) => ({
    width: "100vw",
    height: "100vh",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  })
);

export const Layout = ({ variant, ...props }) => {
  const classes = useStyles();

  return (
    <LayoutRoot>
      <Layout.Banner xs>
        <Grid container justifyContent="center">
          <Grid item container className={classes.textContainer}>
            <Grid item>
              <Bubble />
            </Grid>
            <Grid item component={Typography} className={classes.text}>
              Converse with anyone with any language
            </Grid>
          </Grid>
        </Grid>
      </Layout.Banner>
      <Layout.MainContainer xs>
        <Layout.Navbar variant={variant} />
        <Layout.Content>{props.children}</Layout.Content>
      </Layout.MainContainer>
    </LayoutRoot>
  );
};

Layout.Banner = ({ children, ...props }) => {
  return (
    <BannerRoot {...props}>
      <Grid item>{children}</Grid>
    </BannerRoot>
  );
};

Layout.MainContainer = ({ children, ...props }) => {
  return (
    <Grid item container direction="column" {...props}>
      {children}
    </Grid>
  );
};

Layout.Navbar = (props) => {
  return (
    <React.Fragment>
      <MobileNavBar {...props} />
      <DesktopNavBar {...props} />
    </React.Fragment>
  );
};

Layout.Content = styled((props) => <Grid item container {...props} />)(
  ({ theme }) => ({
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: theme.spacing(10) + "px",
  })
);

export default Layout;
