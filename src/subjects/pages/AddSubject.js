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

const AddSubject = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [values,setValues]=useState({
      subjectName:'',
      subjectCode:'',
      offeredYear:'',
      offeredSemester:'',
      lectureHours:'',
      tutorialHours:'',
      labHours:'',
      evaluationHours:''
  });

  
  const {subjectName,subjectCode,offeredYear,offeredSemester,lectureHours,tutorialHours,labHours,evaluationHours}=values;

  const onChangeHandler=(inputFieldName)=>(e)=>{
      setValues({...values,[inputFieldName]:e.target.value});
  }
  const submitHandler=(e)=>{
      e.preventDefault();
      const location={subjectName,subjectCode,offeredYear,offeredSemester,lectureHours,tutorialHours,labHours,evaluationHours};
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
            Add a Subject
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("subjectName")}
                  value={subjectName}
                  id="subjectName"
                  name="subjectName"
                  variant="outlined"
                  label="Subject Name"
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
                  label="Subject Code"
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
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  
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
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>

                  
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
export default AddSubject;
