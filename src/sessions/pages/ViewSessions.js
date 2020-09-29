import React, { useState, useEffect } from "react";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { green, red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/custom-hooks/http-hook";
import SearchBar from "material-ui-search-bar";

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
}));

const ViewSessions = () => {
  const classes = useStyles();
  const [loadedSessions, setLoadedSessions] = useState();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  //const [deleteId,setDeleteId]=useState();
  //const [openDialog,setOpenDialog]=useState(false);
  //const [deleteSuccMsg,setDeleteSuccMsg]=useState();
  const [reload, setReload] = useState(); //use to fetch buildings again, after deleting a building.
  //const [filter, setFilter] = useState("");

  // const handleSearchChange = (e) => {
  //   setFilter(e.target.value);
  // };


  useEffect(() => {
    
    const fetchingSessions = async () => {
      try {
        setLoadedSessions(
          await sendRequest("http://localhost:8000/api/session")
        );
      } catch (err) {}
    };
    fetchingSessions();
  }, [sendRequest, reload]);

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
                Session
              </Typography>

              <SearchBar
                  //onChange={() => handleSearchChange()}
                  onRequestSearch={() => console.log('onRequestSearch')}
                  style={{
                    margin: '0 auto',
                    maxWidth: 800
                  }}
              />
              
        </Grid>
      <Grid item xs={12}>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell>Lecturers</TableCell>
                
                <TableCell align="center">Subject (Code)</TableCell>
                <TableCell align="center">Tag</TableCell>
                <TableCell align="center">Group</TableCell>
                <TableCell align="center">Student Count (Duration)</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              {!isLoading &&
                loadedSessions &&
                loadedSessions.sessions.map((session) => (
                  <TableRow key={session.id}>

                    <TableCell component="th" scope="row">{session.lecturers}</TableCell>

                    <TableCell align="center">{session.subject} ({session.subjectCode})</TableCell>
                    <TableCell align="center">{session.tag}</TableCell>
                    <TableCell align="center">{session.studentGroup}</TableCell>
                    <TableCell align="center">{session.studentCount} ({session.duration})</TableCell>
                            
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* PopUp Dialog for delete confirmation*/}
      
    </Grid>
  );
};
export default ViewSessions;




//error checking
//defected lines

// <TableCell align="center">{session.studentGroup.academicYearSem}</TableCell>
