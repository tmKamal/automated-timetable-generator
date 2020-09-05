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

const UpdateSubject = () => {
  const classes = useStyles();
  const subjectId = useParams().sid;
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedSubject, setLoadedSubject] = useState();
  const [msg, setMsg] = useState();
  const [reload, setReload] = useState();
  const history = useHistory();
  const [values, setValues] = useState({
        subjectName:'',
        subjectCode:'',
        offeredYear:'',
        offeredSemester:'',
        lectureHours:'',
        tutorialHours:'',
        labHours:'',
        evaluationHours:''
  });

  const { subjectName,subjectCode,offeredYear,offeredSemester,lectureHours,tutorialHours,labHours,evaluationHours} = values;
  /* fetching subject details */
  useEffect(() => {
    const loadedSubject = async () => {
      const fetchedSubject = await sendRequest(
        `http://localhost:8000/api/subject/${subjectId}`
      );
      setLoadedSubject(fetchedSubject.subject);
      console.log(fetchedSubject.subject);
    };
    loadedSubject();
  }, [sendRequest, reload]);

  useEffect(() => {
    if (loadedSubject) {
      setValues({
        ...values,
        subjectName: loadedSubject.subjectName,
        subjectCode: loadedSubject.subjectCode,
        offeredYear: loadedSubject.offeredYear,
        offeredSemester: loadedSubject.offeredSemester,
        lectureHours: loadedSubject.lectureHours,
        tutorialHours: loadedSubject.tutorialHours,
        labHours: loadedSubject.labHours,
        evaluationHours: loadedSubject.evaluationHours,
      });
    }
  }, [loadedSubject]);

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const location = {
        subjectName,
        subjectCode,
        offeredYear,
        offeredSemester,
        lectureHours,
        tutorialHours,
        labHours,
        evaluationHours,
    };
    console.log(location);
    try {
      const responseData = await sendRequest(
        `http://localhost:8000/api/subject/${subjectId}`,
        "PATCH",
        JSON.stringify(location),
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
    history.push("/view-subjects");
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
                Update Subject
              </Typography>

              <form
                onSubmit={submitHandler}
                className={classes.form}
                noValidate
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      onChange={onChangeHandler("subjectName")}
                      value={subjectName}
                      id="subjectName"
                      name="subjectName"
                      variant="outlined"
                      label="subjectName"
                      error={error.param === "subjectName" ? true : false}
                      helperText={
                        error.param === "subjectName" ? error.msg : ""
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      onChange={onChangeHandler("subjectCode")}
                      value={subjectCode}
                      id="subjectCode"
                      name="subjectCode"
                      variant="outlined"
                      label="subjectCode"
                      error={error.param === "subjectCode" ? true : false}
                      helperText={
                        error.param === "subjectCode" ? error.msg : ""
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Offered Year</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={offeredYear}
                  onChange={onChangeHandler("offeredYear")}
                  label="Offered Year"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Offered Semester</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={offeredSemester}
                  onChange={onChangeHandler("offeredSemester")}
                  label="Offered Semester"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Lecture Hours</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={lectureHours}
                  onChange={onChangeHandler("lectureHours")}
                  label="Lecture Hours"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Tutorial Hours</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={tutorialHours}
                  onChange={onChangeHandler("tutorialHours")}
                  label="Tutorial Hours"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Lab Hours</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={labHours}
                  onChange={onChangeHandler("labHours")}
                  label="Lab Hours"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Evaluation Hours</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={evaluationHours}
                  onChange={onChangeHandler("evaluationHours")}
                  label="Evaluation Hours"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>

                  
                </Select>
              </FormControl>
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
export default UpdateSubject;
