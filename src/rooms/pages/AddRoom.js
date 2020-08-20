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
import { Alert, AlertTitle } from "@material-ui/lab";

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

const AddRoom = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [msg, setMsg] = useState();
  const [values, setValues] = useState({
    buildingName: "",
    lecHallCapacity: "",
    labCapacity: "",
    description: "",
  });

  const { buildingName, lecHallCapacity, labCapacity, description } = values;

  /* to delete */
  const [building, setBuilding] = React.useState("");

  const handleChange = (event) => {
    setBuilding(event.target.value);
  };
  const [type, setType] = React.useState("");

  const handleChange2 = (event) => {
    setType(event.target.value);
  };
  /* end delete */

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const location = {
      buildingName,
      lecHallCapacity,
      labCapacity,
      description,
    };
    console.log(location);
    try {
      const responseData = await sendRequest(
        "http://localhost:8000/api/building/",
        "POST",
        JSON.stringify(location),
        { "Content-Type": "application/json" }
      );
      if (error) {
        console.log(error);
      }
      console.log(responseData);
      if (responseData) {
        setValues({
          buildingName: "",
          lecHallCapacity: "",
          labCapacity: "",
          description: "",
        });
        console.log(responseData);
        setMsg(responseData.msg);
      }
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
            Add a Room
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("buildingName")}
                  value={buildingName}
                  id="buildingName"
                  name="buildingName"
                  variant="outlined"
                  label="Room Name"
                  error={error.param === "buildingName" ? true : false}
                  helperText={error.param === "buildingName" ? error.msg : ""}
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("lecHallCapacity")}
                  value={lecHallCapacity}
                  id="lecHallCapacity"
                  name="lecHallCapacity"
                  variant="outlined"
                  label="Lecture Hall Capacity"
                  error={error.param==='lecHallCapacity'? true : false}
                  helperText={error.param==='lecHallCapacity'? error.msg : ''}
                  fullWidth
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("labCapacity")}
                  value={labCapacity}
                  id="labCapacity"
                  name="labCapacity"
                  variant="outlined"
                  label="Labarotary Capacity"
                  error={error.param==='labCapacity'? true : false}
                  helperText={error.param==='labCapacity'? error.msg : ''}
                  fullWidth
                />
              </Grid> */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Building Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={building}
                    onChange={handleChange}
                    label="Select a Building"
                  >
                    <MenuItem value={10}>New Building</MenuItem>
                    <MenuItem value={20}>Main Building</MenuItem>
                    <MenuItem value={30}>Engineer Building</MenuItem>
                    <MenuItem value={30}>Updated Building</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Room Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Select a Building"
                    value={type}
                    onChange={handleChange2}
                  >
                    <MenuItem value={10}>Lecture Hall</MenuItem>
                    <MenuItem value={20}>Laboratory</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={onChangeHandler("description")}
                  value={description}
                  required
                  id="description"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  error={error.param === "description" ? true : false}
                  helperText={error.param === "description" ? error.msg : ""}
                  fullWidth
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>
                      {error.backendMsg
                        ? error.backendMsg
                        : "Please Resolve the above error & try again"}{" "}
                    </strong>
                  </Alert>
                </Grid>
              )}
              {msg && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    <AlertTitle>Success !!</AlertTitle>
                    {msg}
                  </Alert>
                </Grid>
              )}
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
export default AddRoom;
