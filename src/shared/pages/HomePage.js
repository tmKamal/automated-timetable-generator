import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, makeStyles, Container } from "@material-ui/core";
import { Bar, Doughnut } from "react-chartjs-2";
import { useHttpClient } from "../../shared/custom-hooks/http-hook";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
}));

const HomePage= () => {
  const classes = useStyles();


  return (
    
      <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Timetable Automater-X
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Automates the boring manual process of preparing time table in universities and colleges with large number of students.
            </Typography>
            
          </Container>
        </div>

  );
};
export default HomePage;


/* import React from 'react';
const HomePage =()=>{
    return (<div>
        Home page
    </div>)
}
export default HomePage; */