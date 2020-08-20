import React,{useState} from "react";
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

const AddLecturer = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [values,setValues]=useState({
      lecturerName:'',
      empId:'',
      faculty:'',
      department:'',
      center:'',
      building:'',
      level:''
  });

  const {lecturerName,empId,faculty,department,center,building,level}=values;

  const onChangeHandler=(inputFieldName)=>(e)=>{
      setValues({...values,[inputFieldName]:e.target.value});
  }
  const submitHandler=(e)=>{
      e.preventDefault();
      const location={lecturerName,empId,faculty,department,center,building,level};
      console.log(location);
      try{
          const responseData=sendRequest('http://localhost:8000/api/building/','POST',JSON.stringify(location),{'Content-Type':'application/json'});
          console.log(responseData);
      }catch(err){
          console.log(error);
      }
  }

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
            Add a Lecturer
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("lecturerName")}
                  value={lecturerName}
                  id="lecturerName"
                  name="lecturerName"
                  variant="outlined"
                  label="Lecturer Name"
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
                  label="Lecturer Employee ID"
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
                  <MenuItem value={1}>Computing</MenuItem>
                  <MenuItem value={2}>Business</MenuItem>
                  <MenuItem value={3}>Engineering</MenuItem>
                  
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
                  onChange={onChangeHandler("offeredSemester")}
                  label="Offered Semester"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Software Engineering</MenuItem>
                  <MenuItem value={2}>Data Science</MenuItem>
                  <MenuItem value={3}>Networking</MenuItem>
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
                  <MenuItem value={1}>Malabe</MenuItem>
                  <MenuItem value={2}>Kandy</MenuItem>
                  <MenuItem value={3}>Kurunegala</MenuItem>
                  <MenuItem value={4}>Matara</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Building</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={building}
                  onChange={onChangeHandler("building")}
                  label="Building"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>A</MenuItem>
                  <MenuItem value={2}>B</MenuItem>
                  <MenuItem value={3}>N</MenuItem>
                  <MenuItem value={4}>E</MenuItem>
                  
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
export default AddLecturer;
