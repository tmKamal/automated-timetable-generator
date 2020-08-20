import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  alignRight: {
    textAlign: "right",
  },
  errorTextShow: {
    color: "red",
    display: "block",
  },
  errorTextHide: {
    color: "black",
    display: "none",
  },
}));

const AddTag = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    tagType: "",
  });

  const { tagType } = state;

  const onChangeHandler = (inputFieldName) => (e) => {
    setState({ ...values, [inputFieldName]: e.target.value });
  };
  const handleChange = (event) => {
    setState(event.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const group = {
      tagType,
    };
    const body = { group };
    console.log(body);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main style={{ marginTop: "100px" }} className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ marginBottom: "20px" }}
            component="h1"
            variant="h4"
            align="center"
          >
            Add Tag
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="tagType">Tag Type</InputLabel>
                  <Select
                    labelId="tagType"
                    id="tagType"
                    value={tagType}
                    onChange={handleChange}
                    label="Tag Type"
                    style={{ width: "510px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Lecture</MenuItem>
                    <MenuItem value={2}>Tutorial</MenuItem>
                    <MenuItem value={3}>Practical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};
export default AddTag;
