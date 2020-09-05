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
import { useParams, useHistory } from "react-router-dom";

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
  btnGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttons: {},
  buttonsTwo: {},
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const UpdateStudent = () => {
  const classes = useStyles();
  const studentId = useParams().sid;
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedStudent, setLoadedStudent] = useState();
  const [msg, setMsg] = useState();
  const [reload, setReload] = useState();
  const history = useHistory();
  const [values, setValues] = useState({
    academicYearSem: "",
    programme: "",
    groupNumber: "",
    subGroupNumber: "",
  });

  const { academicYearSem, programme, groupNumber, subGroupNumber } = values;
  /* fetching students details */
  useEffect(() => {
    const loadedStudent = async () => {
      const fetchedStudent = await sendRequest(
        `http://localhost:8000/api/student/${studentId}`
      );
      setLoadedStudent(fetchedStudent.student);
    };
    loadedStudent();
  }, [sendRequest, reload]);

  useEffect(() => {
    if (loadedStudent) {
      setValues({
        ...values,
        academicYearSem: loadedStudent.academicYearSem,
        programme: loadedStudent.programme,
        groupNumber: loadedStudent.groupNumber,
        subGroupNumber: loadedStudent.subGroupNumber,
      });
    }
  }, [loadedStudent]);

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const group = {
      academicYearSem,
      programme,
      groupNumber,
      subGroupNumber,
    };
    console.log(group);
    try {
      const responseData = await sendRequest(
        `http://localhost:8000/api/student/${studentId}`,
        "PATCH",
        JSON.stringify(group),
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
  const backToView = () => {
    history.push("/view-student");
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main style={{ marginTop: "100px" }} className={classes.layout}>
        <Paper className={classes.paper}>
          {!isLoading && (
            <React.Fragment>
              <Typography
                style={{ marginBottom: "20px" }}
                component="h1"
                variant="h4"
                align="center"
              >
                Add a Student
              </Typography>

              <form
                onSubmit={submitHandler}
                className={classes.form}
                noValidate
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl
                      style={{ width: "552px" }}
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="academicYearSem">
                        Academic Year and Semester
                      </InputLabel>
                      <Select
                        labelId="academicYearSem"
                        id="academicYearSem"
                        value={academicYearSem}
                        onChange={onChangeHandler("academicYearSem")}
                        label="Academic Year and Semester"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Y1.S1"}>Y1.S1</MenuItem>
                        <MenuItem value={"Y1.S2"}>Y1.S2</MenuItem>
                        <MenuItem value={"Y2.S1"}>Y2.S1</MenuItem>
                        <MenuItem value={"Y2.S2"}>Y2.S2</MenuItem>
                        <MenuItem value={"Y3.S1"}>Y3.S1</MenuItem>
                        <MenuItem value={"Y3.S2"}>Y3.S2</MenuItem>
                        <MenuItem value={"Y4.S1"}>Y4.S1</MenuItem>
                        <MenuItem value={"Y4.S2"}>Y4.S2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      style={{ width: "552px" }}
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="programme">Programme</InputLabel>
                      <Select
                        labelId="programme"
                        id="programme"
                        value={programme}
                        onChange={onChangeHandler("programme")}
                        label="Programme"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"IT"}>IT</MenuItem>
                        <MenuItem value={"CSSE"}>CSSE</MenuItem>
                        <MenuItem value={"CSE"}>CSE</MenuItem>
                        <MenuItem value={"IM"}>IM</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type="Number"
                      onChange={onChangeHandler("groupNumber")}
                      value={groupNumber}
                      id="groupNumber"
                      name="groupNumber"
                      variant="outlined"
                      label="Group Number"
                      error={error.param === "groupNumber" ? true : false}
                      helperText={
                        error.param === "groupNumber" ? error.msg : ""
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type="Number"
                      onChange={onChangeHandler("subGroupNumber")}
                      value={subGroupNumber}
                      id="subGroupNumber"
                      name="subGroupNumber"
                      variant="outlined"
                      label="Sub Group Number"
                      error={error.param === "subGroupNumber" ? true : false}
                      helperText={
                        error.param === "subGroupNumber" ? error.msg : ""
                      }
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
                <div className={classes.btnGrid}>
                  <div className={classes.buttonsTwo}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      onClick={backToView}
                    >
                      Back to View
                    </Button>
                  </div>
                  <div className={classes.buttons}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </form>
            </React.Fragment>
          )}
          {isLoading && (
            <Typography
              style={{ marginBottom: "20px" }}
              component="h1"
              variant="h4"
              align="center"
            >
              Form is loading....
            </Typography>
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
};
export default UpdateStudent;
