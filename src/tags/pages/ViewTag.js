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

const ViewTags = () => {
  const classes = useStyles();
  const [loadedTags, setLoadedTags] = useState();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [deleteId, setDeleteId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteSuccMsg, setDeleteSuccMsg] = useState();
  const [reload, setReload] = useState(); //use to fetch tags again, after deleting a tag.

  useEffect(() => {
    const fetchingTags = async () => {
      try {
        setLoadedTags(await sendRequest("http://localhost:8000/api/tag"));
      } catch (err) {}
    };
    fetchingTags();
  }, [sendRequest, reload]);

  const deleteDialogOpener = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };
  const deleteDialogCloser = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };
  const tagDeleteHandler = () => {
    const deleteTag = async () => {
      try {
        const delMsg = await sendRequest(
          `http://localhost:8000/api/tag/${deleteId}`,
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
    deleteTag();
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
          Tags
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {deleteSuccMsg && (
          <Alert
            onClose={() => {
              setDeleteSuccMsg(false);
            }}
          >
            Tag has been successfully deleted.
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Tag types</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                loadedTags &&
                loadedTags.tags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell component="th" scope="row">
                      {tag.tagType}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/update/tag/${tag.id}`}>
                        <IconButton color="secondary" aria-label="Edit the tag">
                          <CreateIcon style={{ color: green[500] }} />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => deleteDialogOpener(tag.id)}
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
        {!isLoading && loadedTags && loadedTags.tags.length === 0 && (
          <React.Fragment>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              className={classes.marginT}
            >
              You haven’t Created Any Tags yet
            </Typography>
            <div>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    href="/admin/crud/tag-create"
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
            Are you really wanted to delete this Tag?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={tagDeleteHandler} color="primary">
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
export default ViewTags;
