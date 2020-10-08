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

const ViewRooms = () => {
  const classes = useStyles();
  const [loadedRooms, setLoadedRooms] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const [deleteId, setDeleteId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteSuccMsg, setDeleteSuccMsg] = useState();
  const [reload, setReload] = useState(); //use to fetch rooms again, after deleting a room.

  useEffect(() => {
    const fetchingRooms = async () => {
      try {
        setLoadedRooms(
          await sendRequest(
            "https://timetable-generator-api.herokuapp.com/api/room"
          )
        );
      } catch (err) {}
    };
    fetchingRooms();
  }, [sendRequest, reload]);

  const deleteDialogOpener = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };
  const deleteDialogCloser = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };
  const roomDeleteHandler = () => {
    const deleteRoom = async () => {
      try {
        const delMsg = await sendRequest(
          `https://timetable-generator-api.herokuapp.com/api/room/${deleteId}`,
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
      } catch (err) {
        deleteDialogCloser();
      }
    };
    deleteRoom();
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
          Rooms
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {deleteSuccMsg && (
          <Alert
            onClose={() => {
              setDeleteSuccMsg(false);
            }}
          >
            Room has been successfully deleted.
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Room Name</TableCell>

                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Building</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                loadedRooms &&
                loadedRooms.rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell component="th" scope="row">
                      {room.roomName}
                    </TableCell>

                    <TableCell align="center">{room.roomType}</TableCell>
                    <TableCell align="center">{room.roomCapacity}</TableCell>
                    <TableCell align="center">
                      {room.buildingId.buildingName}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/update/room/${room.id}`}>
                        <IconButton
                          color="secondary"
                          aria-label="edit the room"
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
                        onClick={() => deleteDialogOpener(room.id)}
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
        {!isLoading && loadedRooms && loadedRooms.rooms.length === 0 && (
          <React.Fragment>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              className={classes.marginT}
            >
              You haven’t created any rooms yet
            </Typography>
            <div>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    href="/admin/crud/room-create"
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
            Are you realy wanted to delete this room?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={roomDeleteHandler} color="primary">
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
export default ViewRooms;
