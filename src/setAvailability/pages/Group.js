import React, { useState, useEffect } from "react";
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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

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

const GroupNotAvailable = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [msg, setMsg] = useState();
  const [reload, setReload] = useState();
  const [values, setValues] = useState({
    studentId: "",
    day: "",
    hours: "",
    minutes: "",
    duration: "",
  });

  const [groupData, setGroupData] = useState();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-09-23T08:00:00")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    /* Extracting hour and minutes from the data obj using moment.js */
    console.log(moment(date).format("H"));
    console.log(moment(date).format("mm"));
    const h = Number(moment(date).format("H"));
    const m = Number(moment(date).format("mm"));
    setValues({ ...values, hours: h, minutes: m });
  };

  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  const { studentId, day, hours, minutes, duration } = values;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await sendRequest(
          "https://timetable-generator-api.herokuapp.com/api/studentGroup/"
        );
        if (error) {
          console.log(error);
        }
        if (response) {
          setGroupData(response.students);
        }
        console.log(response);
      } catch (err) {
        console.log(error);
      }
    };

    fetchGroups();

    setReload(false);
  }, [reload]);

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
    setDisableSubmitBtn(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    setDisableSubmitBtn(true);
    const notAvailableTime = {
      day,
      hours,
      minutes,
      duration,
    };
    console.log(notAvailableTime);
    try {
      const responseData = await sendRequest(
        `https://timetable-generator-api.herokuapp.com/api/studentGroup/not-available/${studentId}`,
        "PATCH",
        JSON.stringify(notAvailableTime),
        { "Content-Type": "application/json" }
      );
      if (error) {
        console.log(error);
      }
      console.log(responseData);
      if (responseData) {
        setReload(true);

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
            Set Not Avaialbility for Students(Groups)
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  style={{ width: "552px" }}
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="studentId">Student Group</InputLabel>
                  <Select
                    labelId="studentId"
                    id="studentId"
                    value={studentId}
                    onChange={onChangeHandler("studentId")}
                    label="Student Group"
                  >
                    {!isLoading &&
                      groupData &&
                      groupData.map((b) => {
                        return (
                          <MenuItem key={b.id} value={b.id}>
                            {b.academicYearSem +
                              "." +
                              b.programme +
                              "." +
                              b.groupNumber}
                          </MenuItem>
                        );
                      })}
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    inputVariant="outlined"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    fullWidth
                  ></KeyboardTimePicker>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  onChange={onChangeHandler("duration")}
                  value={duration}
                  id="duration"
                  name="duration"
                  variant="outlined"
                  label="Duration (Hrs)"
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
                disabled={disableSubmitBtn}
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
export default GroupNotAvailable;
