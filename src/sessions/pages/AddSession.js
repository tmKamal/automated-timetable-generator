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

const AddSession = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [values,setValues]=useState({
      lecturer:'',
      tag:'',
      studentGroup:'',
      subGroup:'',
      subject:'',
      StudentCount:'',
      duration:''
  });

  

  const {lecturer,tag,studentGroup,subGroup,subject,studentCount,duration}=values;

  const onChangeHandler=(inputFieldName)=>(e)=>{
      setValues({...values,[inputFieldName]:e.target.value});
  }
  const submitHandler=(e)=>{
      e.preventDefault();
      const location={lecturer,tag,studentGroup,subGroup,subject,studentCount,duration};
      console.log(location);
      try{
          const responseData=sendRequest('http://localhost:8000/api/building/','POST',JSON.stringify(location),{'Content-Type':'application/json'})
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
            Add a Building
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              
            <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Lecturer</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={lecturer}
                  onChange={onChangeHandler("lecturer")}
                  label="lecturer"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Lecturer A</MenuItem>
                  <MenuItem value={2}>Lecturer B</MenuItem>
                  <MenuItem value={3}>Lecturer N</MenuItem>
                  <MenuItem value={4}>Lecturer E</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Tag</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={tag}
                  onChange={onChangeHandler("tag")}
                  label="Tag"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>IT</MenuItem>
                  <MenuItem value={2}>BM</MenuItem>
                  <MenuItem value={3}>ENG</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Student Group</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={studentGroup}
                  onChange={onChangeHandler("studentGroup")}
                  label="studentGroup"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>8</MenuItem>
                  <MenuItem value={2}>9</MenuItem>
                  <MenuItem value={3}>10</MenuItem>
                  <MenuItem value={4}>11</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">sub-Group</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={subGroup}
                  onChange={onChangeHandler("subGroup")}
                  label="subGroup"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={subject}
                  onChange={onChangeHandler("subject")}
                  label="subject"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>SPM</MenuItem>
                  <MenuItem value={2}>CSSE</MenuItem>
                  <MenuItem value={3}>UEE</MenuItem>
                  <MenuItem value={4}>DMS</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Student Count</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={studentCount}
                  onChange={onChangeHandler("studentCount")}
                  label="student Count"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>30</MenuItem>
                  <MenuItem value={2}>60</MenuItem>
                  <MenuItem value={3}>90</MenuItem>
                  <MenuItem value={4}>120</MenuItem>
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Duration</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={duration}
                  onChange={onChangeHandler("duration")}
                  label="duration"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  
                  
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
export default AddSession;
