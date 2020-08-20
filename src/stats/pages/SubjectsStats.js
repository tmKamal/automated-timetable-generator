import React,{useState,useEffect} from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { Line, Doughnut } from "react-chartjs-2";

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
    const [chartData,setChartData]=useState({});

    const chart=()=>{
        setChartData({
            labels: [
                'Lecture hours',
                'Tutorial hours',
                'Labs hours'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        })
    }
    useEffect(() => {
        chart();
    }, []);

    

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
          Average precentage of subject contents (Hours)
        </Typography>
           
            <Doughnut data={chartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default SubjectsStats;
