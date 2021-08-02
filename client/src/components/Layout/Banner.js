import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as Bubble } from "../../images/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(rgba(58,157,255, 0.85),  rgba(134,185,255, 0.85)), url(/bg-img.png)`,
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
  },
  bubble: {
    paddingBottom: "2rem",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Bubble className={classes.bubble} />
        <Typography variant="h5" className={classes.text}>
          Converse with anyone
        </Typography>
        <Typography variant="h5" className={classes.text}>
          with any language
        </Typography>
      </div>
    </div>
  );
};

export default Banner;
