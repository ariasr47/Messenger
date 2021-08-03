import { Children } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const FormRoot = styled("form")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
}));

export const Form = (props) => {
  return (
    <FormRoot>
      <Grid container direction="column" spacing={2}>
        {props.children}
      </Grid>
    </FormRoot>
  );
};

Form.Label = (props) => {
  return (
    <Grid item container>
      <Typography variant="h5">
        <b>{props.children}</b>
      </Typography>
    </Grid>
  );
};

Form.Fields = (props) => {
  return (
    <Grid item container direction="column" spacing={2}>
      {Children.toArray(props.children).map((Field, index) => (
        <Grid key={index} item>
          {Field}
        </Grid>
      ))}
    </Grid>
  );
};

Form.Actions = (props) => (
  <Grid item container {...props}>
    {props.children}
  </Grid>
);

Form.Button = styled((props) => (
  <Button color="primary" variant="contained" size="large" {...props} />
))(({ theme }) => ({
  padding: `${theme.spacing(1)}px ${theme.spacing(6)}px `,
}));

export default Form;
