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

const ViewSubjects = () => {
  const classes = useStyles();
  const [loadedSubjects, setloadedSubjects] = useState();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [deleteId,setDeleteId]=useState();
  const [openDialog,setOpenDialog]=useState(false);
  const [deleteSuccMsg,setDeleteSuccMsg]=useState();
  const [reload, setReload] = useState(); //use to fetch buildings again, after deleting a building.


  useEffect(() => {
    const fetchingSubjects = async () => {
      try {
        setloadedSubjects(
          await sendRequest("http://localhost:8000/api/subject")
        );
      } catch (err) {}
    };
    fetchingSubjects();
  }, [sendRequest, reload]);

  const deleteDialogOpener=(id)=>{
    setDeleteId(id);
    setOpenDialog(true);
  }
  const deleteDialogCloser = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };
  const subjectDeleteHandler=()=>{
    const deleteSubject = async () => {
        try {
          const delMsg = await sendRequest(
            `http://localhost:8000/api/subject/${deleteId}`,
            "DELETE",
            null,
            {  }
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
      deleteSubject();
  }

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
                Subjects
              </Typography>
        </Grid>
      <Grid item xs={12}>
        {deleteSuccMsg && (
          <Alert
            onClose={() => {
              setDeleteSuccMsg(false);
            }}
          >
            Subject has been successfully deleted.
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>

                <TableCell align="center">Subject ID</TableCell>
                <TableCell align="center">Offered year</TableCell>
                <TableCell align="center">Offered Semester</TableCell>
                <TableCell align="center">Lecture Hrs</TableCell>
                <TableCell align="center">Tutorial Hrs</TableCell>
                <TableCell align="center">Lab Hrs</TableCell>
                <TableCell align="center">Evaluation Hrs</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                loadedSubjects &&
                loadedSubjects.subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell component="th" scope="row">
                      {subject.subjectName}
                    </TableCell>

                    <TableCell align="center">
                      {subject.subjectCode}
                    </TableCell>
                    <TableCell align="center">{subject.offeredYear}</TableCell>
                    <TableCell align="center">{subject.offeredSemester}</TableCell>
                    <TableCell align="center">{subject.lectureHours}</TableCell>
                    <TableCell align="center">{subject.tutorialHours}</TableCell>
                    <TableCell align="center">{subject.labHours}</TableCell>
                    <TableCell align="center">{subject.evaluationHours}</TableCell>
                    <TableCell align="center">
                      <Link to={`/update-subject/${subject.id}`}>
                        <IconButton
                          
                          color="secondary"
                          aria-label="edit the subject"
                        >
                          <CreateIcon style={{ color: green[500] }}/>
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => deleteDialogOpener(subject.id)}
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
        {!isLoading &&
          loadedSubjects &&
          loadedSubjects.subjects.length === 0 && (
            <React.Fragment>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
                className={classes.marginT}
              >
                You haven’t created any subjects yet
              </Typography>
              <div>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      href="/admin/crud/subject-create"
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
            Are you realy wanted to delete this subject?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={subjectDeleteHandler} color="primary">
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
export default ViewSubjects;
