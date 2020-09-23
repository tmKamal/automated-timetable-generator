import React,{useState, useEffect} from "react";
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
import { Alert, AlertTitle } from '@material-ui/lab';
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
  const [msg, setMsg]=useState();
  
  const [values,setValues]=useState({
      lecturers:[],
      tag:'',
      studentGroup:'',
      //subGroup:'',
      subject:'',
      //subjectCode:'',
      studentCount:'',
      duration:'',
  });
  const [subjectData,setSubjectData]=useState();
  useEffect(() => {
    const fetchSubject = async() => {
    try{
      const response = await sendRequest(
        "http://localhost:8000/api/subject/"
      );
      if(error){
        console.log(error);
      }
      if(response){
        setSubjectData(response);
      }
      console.log(response);

    } catch(err){
      console.log(error);
    }}
    fetchSubject();
  }, []);

  const [tagData,setTagData]=useState();
  useEffect(() => {
    const fetchTag = async() => {
    try{
      const response = await sendRequest(
        "http://localhost:8000/api/tag/"
      );
      if(error){
        console.log(error);
      }
      if(response){
        setTagData(response);
      }
      console.log(response);

    } catch(err){
      console.log(error);
    }}
    fetchTag();
  }, []);

  const [studentData,setStudentData]=useState();
  useEffect(() => {
    const fetchStudent = async() => {
    try{
      const response = await sendRequest(
        "http://localhost:8000/api/student/"
      );
      if(error){
        console.log(error);
      }
      if(response){
        setStudentData(response);
      }
      console.log(response);

    } catch(err){
      console.log(error);
    }}
    fetchStudent();
  }, []);

  const [lecturerData,setLecturerData]=useState();
  useEffect(() => {
    const fetchLecturer = async() => {
    try{
      const response = await sendRequest(
        "http://localhost:8000/api/lecturer/"
      );
      if(error){
        console.log(error);
      }
      if(response){
        setLecturerData(response);
      }
      console.log(response);

    } catch(err){
      console.log(error);
    }}
    fetchLecturer();
  }, []);
  

  const {lecturers,tag,studentGroup,subject,studentCount,duration}=values;
  //subGroup,subjectCode
  const onChangeHandler=(inputFieldName)=>(e)=>{
      setValues({...values,[inputFieldName]:e.target.value});
      setMsg(null),
      errorPopupCloser();
  };


  const submitHandler=(e)=>{
      e.preventDefault();
      errorPopupCloser();
      const location={lecId:lecturers,tagId:tag,stdId:studentGroup,subjectId:subject,studentCount,duration};
      //subGroup,subjectCode
      console.log(location);
      try{
          const responseData=sendRequest("http://localhost:8000/api/session/",'POST',JSON.stringify(location),{'Content-Type':'application/json'});
          if(error){
            console.log(error);
          }
          console.log(responseData);
          if(responseData){
            setValues({ lecturers:[],tag:'',studentGroup:'',subject:'',studentCount:'',duration:''});
            console.log(responseData);
            setMsg(responseData.msg);
          }
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
            Add a Session
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              
            <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Lecturer</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={lecturers}
                  onChange={onChangeHandler("lecturers")}
                  label="lecturer"
                >
                {!isLoading && lecturerData && lecturerData.lecturers.map((l) => {
                  return(
                    <MenuItem key = {l.id} value={l.id}>{l.lecturerName}</MenuItem>
                  )
                })}
                  
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
                {!isLoading && tagData && tagData.tags.map((t) => {
                  return(
                    <MenuItem key = {t.id} value={t.id}>{t.tagType}</MenuItem>
                  )
                })}
                  
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
                {!isLoading && studentData && studentData.students.map((s) => {
                  return(
                    <MenuItem key = {s.id} value={s.id}>{s.groupNumber}</MenuItem>
                  )
                })}
                  
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
                  
                {!isLoading && subjectData && subjectData.subjects.map((s) => {
                  return(
                    <MenuItem key = {s.id} value={s.id}>{s.subjectName}</MenuItem>
                  )
                })}
                  
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
                  <MenuItem value={60}>60</MenuItem>
                  <MenuItem value={120}>120</MenuItem>
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
