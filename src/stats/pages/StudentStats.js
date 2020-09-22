import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { Line, Doughnut } from "react-chartjs-2";
import { useHttpClient } from "../../shared/custom-hooks/http-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },

  marginT: {
    marginTop: "2rem",
  },
  marginY: {
    marginTop: "0.5rem",
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
}));

const StudentStats = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  let pieChartData;
  const [students, setStudents] = useState();
  const [lecturers, setLecturers] = useState();
 
  let lecturersCount=0;
  let studentsCount=0;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:8000/api/student/"
        );
        console.log(response.students);
        if (response) {
          setStudents(response.students);
        } else {
          console.log(error);
        }
      } catch (e) {}
    };
    const fetchLecturers = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:8000/api/lecturer/"
        );
        console.log(response.lecturers);
        if (response) {
          setLecturers(response.lecturers);
        } else {
          console.log(error);
        }
      } catch (e) {}
    };
    fetchLecturers();
    fetchStudents();
  }, []);

  const studentsToLecsGraph = () => {
    if (!isLoading && students && lecturers) {
      
      lecturersCount=lecturers.length;
      studentsCount=students.length;

      pieChartData = {
        labels: [
          "Groups",
          "Lecturers"
        ],
        datasets: [
          {
            data: [
              studentsCount,
              lecturersCount,
          
            ],
            backgroundColor: ["#FF6384",  "#2ec1ac"],
            hoverBackgroundColor: ["#FF6384",  "#2ec1ac"],
          },
        ],
      };
    }
  };


  studentsToLecsGraph();


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
          className={classes.marginT}
        >
          Statistics related to the Students
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.marginY}
          >
            Student Group - Academic staff ratio
          </Typography>

          {!isLoading && lecturers && students && <Doughnut data={pieChartData} />}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default StudentStats;
