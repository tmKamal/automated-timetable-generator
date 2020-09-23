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

const SetLecturer = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [msg, setMsg] = useState();
  const [values, setValues] = useState({
    lecturerName: "",
    day: "",
    hours: "",
    minutes: "",
    duration: "",
  });

  const { lecturerName, day, hours, minutes, duration } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const group = {
      lecturerName,
      day,
      hours,
      minutes,
      duration,
    };
    console.log(group);
    try {
      const responseData = await sendRequest(
        "http://localhost:8000/api/availability/",
        "POST",
        JSON.stringify(group),
        { "Content-Type": "application/json" }
      );
      if (error) {
        console.log(error);
      }
      console.log(responseData);
      if (responseData) {
        setValues({
          lecturerName: "",
          day: "",
          hours: "",
          minutes: "",
          duration: "",
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
            Set Not Avaialbility for Lecturers
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  style={{ width: "552px" }}
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="lecturerName">Lecturer Name</InputLabel>
                  <Select
                    labelId="lecturerName"
                    id="lecturerName"
                    value={lecturerName}
                    onChange={onChangeHandler("lecturerName")}
                    label="Lecturer Name"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Y1.S1"}>Y1.S1</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  style={{ width: "552px" }}
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="day">Day</InputLabel>
                  <Select
                    labelId="day"
                    id="day"
                    value={day}
                    onChange={onChangeHandler("day")}
                    label="Day"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Monday"}>Monday</MenuItem>
                    <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                    <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                    <MenuItem value={"Thursday"}>Thursday</MenuItem>
                    <MenuItem value={"Friday"}>Friday</MenuItem>
                    <MenuItem value={"Saturday"}>Saturday</MenuItem>
                    <MenuItem value={"Sunday"}>Sunday</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="Number"
                  onChange={onChangeHandler("hours")}
                  value={hours}
                  id="hours"
                  name="hours"
                  variant="outlined"
                  label="Hours"
                  fullWidth
                  style={{ marginBottom: "30px" }}
                />
                <TextField
                  required
                  type="Number"
                  onChange={onChangeHandler("minutes")}
                  value={minutes}
                  id="minutes"
                  name="minutes"
                  variant="outlined"
                  label="Minutes"
                  fullWidth
                  style={{ marginBottom: "30px" }}
                />
                <TextField
                  required
                  type="Number"
                  onChange={onChangeHandler("duration")}
                  value={duration}
                  id="duration"
                  name="duration"
                  variant="outlined"
                  label="Duration"
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
export default SetLecturer;
