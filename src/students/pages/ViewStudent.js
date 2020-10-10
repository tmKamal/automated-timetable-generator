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

const ViewStudents = () => {
  const classes = useStyles();
  const [loadedStudents, setLoadedStudents] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const [deleteId, setDeleteId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteSuccMsg, setDeleteSuccMsg] = useState();
  const [reload, setReload] = useState(); //use to fetch students again, after deleting a student.

  useEffect(() => {
    const fetchingStudents = async () => {
      try {
        setLoadedStudents(
          await sendRequest(
            "https://timetable-generator-api.herokuapp.com/api/student"
          )
        );
      } catch (err) {}
    };
    fetchingStudents();
  }, [sendRequest, reload]);

  const deleteDialogOpener = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };
  const deleteDialogCloser = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };
  const studentDeleteHandler = () => {
    const deleteStudent = async () => {
      try {
        const delMsg = await sendRequest(
          `https://timetable-generator-api.herokuapp.com/api/student/${deleteId}`,
          "DELETE",
          null,
          {}
        );
        if (delMsg) {
          setDeleteId(null);
          deleteDialogCloser();
          setDeleteSuccMsg(true);
          setReload(!reload);
        }
      } catch (error) {
        deleteDialogCloser();
      }
    };
    deleteStudent();
  };

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
          Students
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {deleteSuccMsg && (
          <Alert
            onClose={() => {
              setDeleteSuccMsg(false);
            }}
          >
            Student has been successfully deleted.
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Acc.Year and Sem</TableCell>
                <TableCell align="center">Programme</TableCell>
                <TableCell align="center">Group No.</TableCell>
                <TableCell align="center">Subgroup No.</TableCell>
                <TableCell align="center">Group ID</TableCell>
                <TableCell align="center">Subgroup ID</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                loadedStudents &&
                loadedStudents.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell component="th" scope="row">
                      {student.academicYearSem}
                    </TableCell>
                    <TableCell align="center">{student.programme}</TableCell>
                    <TableCell align="center">{student.groupNumber}</TableCell>
                    <TableCell align="center">
                      {student.subGroupNumber}
                    </TableCell>
                    <TableCell align="center">
                      {student.academicYearSem +
                        "." +
                        student.programme +
                        "." +
                        student.groupNumber}
                    </TableCell>
                    <TableCell align="center">
                      {student.academicYearSem +
                        "." +
                        student.programme +
                        "." +
                        student.groupNumber +
                        "." +
                        student.subGroupNumber}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/update/student/${student.id}`}>
                        <IconButton
                          color="secondary"
                          aria-label="Edit the student"
                        >
                          <CreateIcon
                            style={{
                              color: green[500],
                            }}
                          />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => deleteDialogOpener(student.id)}
                        color="secondary"
                        aria-label="add an alarm"
                      >
                        <DeleteIcon style={{ color: red[500] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!isLoading && loadedStudents && loadedStudents.students.length === 0 && (
          <React.Fragment>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              className={classes.marginT}
            >
              You haven’t Created Any Students yet
            </Typography>
            <div>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    href="/admin/crud/student-create"
                    variant="outlined"
                    color="primary"
                  >
                    Create One Now
                  </Button>
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        )}
      </Grid>
      {/* PopUp Dialog for delete confirmation*/}
      <Dialog
        open={openDialog}
        onClose={deleteDialogCloser}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confiramtion dialog box?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you really wanted to delete this Student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={studentDeleteHandler} color="primary">
            Yes
          </Button>
          <Button onClick={deleteDialogCloser} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default ViewStudents;
