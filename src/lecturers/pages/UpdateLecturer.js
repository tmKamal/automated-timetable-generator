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

const UpdateLecturer = () => {
  const classes = useStyles();
  const lecturerId = useParams().lid;
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedLecturer, setLoadedLecturer] = useState();
  const [loadedBuilding, setLoadedBuilding] = useState();
  const [msg, setMsg] = useState();
  const [reload, setReload] = useState();
  const history = useHistory();
  const [values, setValues] = useState({
        lecturerName:'',
        empId:'',
        faculty:'',
        department:'',
        center:'',
        building:'',
        level:'',
  });

  const { lecturerName,empId,faculty,department,center,building,level } = values;
  /* fetching building details */
  useEffect(() => {
    const loadedLecturer = async () => {
      const fetchedLecturer = await sendRequest(
        `http://localhost:8000/api/lecturer/${lecturerId}`
      );
      setLoadedLecturer(fetchedLecturer.lecturer);
    };
    const loadedBuildingsFunc = async () => {
      const fetchedBuilding = await sendRequest(
        `http://localhost:8000/api/building`
      );
      setLoadedBuilding(fetchedBuilding);
    };

    loadedLecturer();
    loadedBuildingsFunc();
    
  }, [sendRequest, reload]);

  useEffect(() => {
    if (loadedLecturer) {
        console.log('lecturers'+loadedLecturer);
      setValues({
        ...values,
        lecturerName: loadedLecturer.lecturerName,
        empId: loadedLecturer.empId,
        faculty: loadedLecturer.faculty,
        department: loadedLecturer.department,
        center: loadedLecturer.center,
        building: loadedLecturer.buildingId.id,
        level: loadedLecturer.level,
      });
    }
  }, [loadedLecturer]);

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const location = {
        lecturerName,
        empId,
        faculty,
        department,
        center,
        building: buildingName,
        level,
    };
    console.log(location);
    try {
      const responseData = await sendRequest(
        `http://localhost:8000/api/lecturer/${lecturerId}`,
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
    history.push("/view-lecturers");
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
                Update lecturer
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
                      onChange={onChangeHandler("lecturerName")}
                      value={lecturerName}
                      id="lecturerName"
                      name="lecturerName"
                      variant="outlined"
                      label="lecturerName"
                      error={error.param === "lecturerName" ? true : false}
                      helperText={
                        error.param === "lecturerName" ? error.msg : ""
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      onChange={onChangeHandler("empId")}
                      value={empId}
                      id="empId"
                      name="empId"
                      variant="outlined"
                      label="empId"
                      error={error.param === "empId" ? true : false}
                      helperText={
                        error.param === "empId" ? error.msg : ""
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Faculty</InputLabel>
                  <Select
                    
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={faculty}
                    onChange={onChangeHandler("faculty")}
                    label="Faculty"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Computing'}>Computing</MenuItem>
                    <MenuItem value={'Business'}>Business</MenuItem>
                    <MenuItem value={'Engineering'}>Engineering</MenuItem>
                    
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={department}
                  onChange={onChangeHandler("department")}
                  label="department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
                  <MenuItem value={'Data Science'}>Data Science</MenuItem>
                  <MenuItem value={'Networking'}>Networking</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Center</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={center}
                  onChange={onChangeHandler("center")}
                  label="Center"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Malabe'}>Malabe</MenuItem>
                  <MenuItem value={'Kandy'}>Kandy</MenuItem>
                  <MenuItem value={'Kurunegala'}>Kurunegala</MenuItem>
                  <MenuItem value={'Matara'}>Matara</MenuItem>
                  
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
                        Building Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={building}
                        onChange={onChangeHandler("building")}
                        label="Building"
                      >
                        {!isLoading &&
                          loadedBuilding &&
                          loadedBuilding.buildings.map((b) => {
                            return (
                              <MenuItem key={b.id} value={b.id}>
                                {b.buildingName}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>        

              
              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={level}
                  onChange={onChangeHandler("level")}
                  label="Level"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  
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
export default UpdateLecturer;
