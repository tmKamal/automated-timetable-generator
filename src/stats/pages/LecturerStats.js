import React,{useState,useEffect} from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

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
    const [chartData,setChartData]=useState({});

    const chart=()=>{
        setChartData({
            labels:['monday','tuesday','wednesday','thursday','friday'],
            datasets:[
                {
            
                    label:'Working hours per day',
                    data:[3.5,5.0,4.0,5.5,3.5],
                    backgroundColor:[
                        'rgba(75,192,192,0.6)'
                    ],
                    borderWidth:4
                }
            ]
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
            <Line data={chartData}></Line>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default LecturerStats;
