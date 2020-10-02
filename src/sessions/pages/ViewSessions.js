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
import { session } from "electron";

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
  //const [search, setSearch] = useState(" ");
  //const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    const fetchingSessions = async () => {
      console.log("im in");
      try {
        const response = await sendRequest(
          "http://localhost:8000/api/session/"
        );
        if (error) {
          console.log(error);
        }
        if (response) {
          console.log(response);
          //filter out dead sessions
          const liveSessions = response.sessions.filter((s) => s.alive == true);
          console.log(liveSessions);
          //filter in only the normal sessions
          const normalSessions = liveSessions.filter((s) => s.type == "normal");
          console.log("hey there" + normalSessions);
          setLoadedSessions(normalSessions);
        }
        console.log(response);
      } catch (err) {
        console.log(error);
      }
    };
    fetchingSessions();
  }, []);

  // useEffect(() => {
  //   setFilteredSessions(
  //     loadedSessions.filter((session) =>
  //       session.subjectCode.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, loadedSessions]);

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
          //onChange={(e) => setSearch(e.target.value)}
          style={{
            margin: "0 auto",
            maxWidth: 800,
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
                <TableCell align="center">Student Count | Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                loadedSessions &&
                loadedSessions.map((session, id) =>
                  session.tag.tagType == "Practical" ? (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                      {session.lecturers.map((l) => {
                          return l.lecturerName+' ';
                        })}
                      </TableCell>

                      <TableCell align="center">
                        {session.subjectCode}
                      </TableCell>
                      <TableCell align="center">
                        {session.tag.tagType}
                      </TableCell>
                      <TableCell align="center">
                        {session.subGroup.academicYearSem +
                          "." +
                          session.subGroup.groupNumber +
                          "." +
                          session.subGroup.subGroupNumber}
                      </TableCell>
                      <TableCell align="center">
                        {session.studentCount} | {session.duration}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {session.lecturers.map((l) => {
                          return l.lecturerName+'  ';
                        })}
                      </TableCell>

                      <TableCell align="center">
                       {session.subjectCode}
                      </TableCell>
                      <TableCell align="center">
                        {session.tag.tagType}
                      </TableCell>
                      <TableCell align="center">
                        {session.studentGroup.academicYearSem +
                          "." +
                          session.studentGroup.groupNumber}
                      </TableCell>
                      <TableCell align="center">
                        {session.studentCount} | {session.duration}
                      </TableCell>
                    </TableRow>
                  )
                )}
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
