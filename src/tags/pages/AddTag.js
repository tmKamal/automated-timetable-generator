import React, { useState } from "react";
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
import { set } from "mongoose";
import { useHttpClient } from "../../shared/custom-hooks/http-hook";

const useStyles = makeStyles((theme) => ({
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
}));

const AddTag = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [values, setValues] = useState({
    tagType: "",
  });

  const { tagType } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const tagGroup = {
      tagType,
    };
    console.log(tagGroup);
    try {
      const responseData = sendRequest(
        "http://localhost:8000/api/tag/",
        "POST",
        JSON.stringify(tagGroup),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
    } catch (err) {
      console.log(error);
    }
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
export default AddStudent;
