import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { Bar, Line } from "react-chartjs-2";
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

const LecturerStats = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [lecturers, setLecturers] = useState();
  let chartData;
  let lecLevel = {
    prof: 0,
    assProf: 0,
    senLecHG: 0,
    senLec: 0,
    lec: 0,
    assLec: 0,
    instructor: 0,
  };

  useEffect(() => {
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
  }, []);

  const lecLevelGraph=()=>{
    if (!isLoading && lecturers) {
      for (let i = 0; i < lecturers.length; i++) {
        switch (lecturers[i].level) {
          case 1:
            lecLevel.prof++;
            break;
          case 2:
            lecLevel.assProf++;
            break;
          case 3:
            lecLevel.senLecHG++;
            break;
          case 4:
            lecLevel.senLec++;
            break;
          case 5:
            lecLevel.lec++;
            break;
          case 6:
            lecLevel.assLec++;
            break;
          case 7:
            lecLevel.instructor++;
            break;
        }
      }
      console.log('this is it: '+lecLevel.senLecHG);
      
  
      chartData = {
        labels: [
          "Professor",
          "Assistant Professor",
          "Senior Lecturer(HG)",
          "Senior Lecturer",
          "Lecturer",
          "Assistant Lecturer",
          "Instructors",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [
              lecLevel.prof,
              lecLevel.assProf,
              lecLevel.senLecHG,
              lecLevel.senLec,
              lecLevel.lec,
              lecLevel.assLec,
              lecLevel.instructor,
            ],
          },
        ],
      };
    }
  }

  lecLevelGraph();

  

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
          Lecurers Statistics
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
            Working hours per day
          </Typography>

          {!isLoading && lecturers && (
            <Bar
              data={chartData}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false,
              }}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default LecturerStats;
