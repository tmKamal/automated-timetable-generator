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

const SubjectsStats = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  let hourChartData;
  let lineChartData;
  const [subjects, setSubjects] = useState();
  let subjectHours = {
    lecHours: 0,
    tutorialHours: 0,
    labHours: 0,
    evaluationHours: 0,
  };
  let subjectYear = {
    firstYear: 0,
    secondYear: 0,
    thirdYear: 0,
    fourthYear: 0,
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:8000/api/subject/"
        );
        console.log(response.subjects);
        if (response) {
          setSubjects(response.subjects);
        } else {
          console.log(error);
        }
      } catch (e) {}
    };
    fetchSubjects();
  }, []);

  const subjectHourGraph = () => {
    if (!isLoading && subjects) {
      for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].lectureHours) {
          subjectHours.lecHours =
            subjectHours.lecHours + subjects[i].lectureHours;
        }
        if (subjects[i].tutorialHours) {
          subjectHours.tutorialHours =
            subjectHours.tutorialHours + subjects[i].tutorialHours;
        }
        if (subjects[i].labHours) {
          subjectHours.labHours = subjectHours.labHours + subjects[i].labHours;
        }
        if (subjects[i].evaluationHours) {
          subjectHours.evaluationHours =
            subjectHours.evaluationHours + subjects[i].evaluationHours;
        }
      }
      console.log("see this" + subjectHours.evaluationHours);

      hourChartData = {
        labels: [
          "Lecture hours",
          "Tutorial hours",
          "Labs hours",
          "Evaluation hours",
        ],
        datasets: [
          {
            data: [
              subjectHours.lecHours,
              subjectHours.tutorialHours,
              subjectHours.labHours,
              subjectHours.evaluationHours,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ec1ac"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ec1ac"],
          },
        ],
      };
    }
  };
  const subjectWorkloadGraph = () => {
    if (!isLoading && subjects) {
      for (let i = 0; i < subjects.length; i++) {
        switch (subjects[i].offeredYear) {
          case 1:
            subjectYear.firstYear++;
            break;
          case 2:
            subjectYear.secondYear++;
            break;
          case 3:
            subjectYear.thirdYear++;
            break;
          case 4:
            subjectYear.fourthYear++;
            break;
          default:
            break;
        }
      }
    }

    lineChartData = {
      labels: ["1st year", "2nd year", "3rd year", "4th year"],
      datasets: [
        {
          label: "Workload",
          data: [subjectYear.firstYear, subjectYear.secondYear, subjectYear.thirdYear, subjectYear.fourthYear],
          backgroundColor: ["rgba(75,192,192,0.6)"],
          borderWidth: 4,
        },
      ],
    };
  };

  subjectHourGraph();
  subjectWorkloadGraph();

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
          Statistics related to the Subjects
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
            Module content distribution
          </Typography>

          {!isLoading && subjects && <Doughnut data={hourChartData} />}
        </Paper>
        <Paper className={classes.paper}>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.marginY}
          >
            Workload distribution by Academic Year
          </Typography>

          {!isLoading && subjects && <Line data={lineChartData}></Line>}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default SubjectsStats;
