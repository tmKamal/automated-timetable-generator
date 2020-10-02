import React, { useState, useEffect } from 'react';
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
    DialogActions
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../shared/custom-hooks/http-hook';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },

    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    table: {
        minWidth: 650
    },

    marginT: {
        marginTop: '2rem'
    }
}));

const ViewLecturers = () => {
    const classes = useStyles();
    const [loadedLecturers, setLoadedLecturers] = useState();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [deleteId, setDeleteId] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteSuccMsg, setDeleteSuccMsg] = useState();
    const [reload, setReload] = useState(); //use to fetch buildings again, after deleting a building.

    useEffect(() => {
        const fetchingLecturers = async () => {
            try {
                setLoadedLecturers(
                    await sendRequest(
                        'https://timetable-generator-api.herokuapp.com/api/lecturer'
                    )
                );
            } catch (err) {}
        };
        fetchingLecturers();
    }, [sendRequest, reload]);

    const deleteDialogOpener = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };
    const deleteDialogCloser = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };
    const lecturerDeleteHandler = () => {
        const deleteLecturer = async () => {
            try {
                const delMsg = await sendRequest(
                    `https://timetable-generator-api.herokuapp.com/api/lecturer/${deleteId}`,
                    'DELETE',
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
        deleteLecturer();
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography
                    variant='h5'
                    align='center'
                    color='textSecondary'
                    paragraph
                    className={classes.marginT}
                >
                    Lecturer
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {deleteSuccMsg && (
                    <Alert
                        onClose={() => {
                            setDeleteSuccMsg(false);
                        }}
                    >
                        Lecturer has been successfully deleted.
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>

                                <TableCell align='center'>Emp ID</TableCell>
                                <TableCell align='center'>Faculty</TableCell>
                                <TableCell align='center'>Department</TableCell>
                                <TableCell align='center'>Center</TableCell>
                                <TableCell align='center'>Building</TableCell>
                                <TableCell align='center'>Level</TableCell>
                                <TableCell align='center'>Rank</TableCell>
                                <TableCell align='center'>Edit</TableCell>
                                <TableCell align='center'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isLoading &&
                                loadedLecturers &&
                                loadedLecturers.lecturers.map((lecturer) => (
                                    <TableRow key={lecturer.id}>
                                        <TableCell component='th' scope='row'>
                                            {lecturer.lecturerName}
                                        </TableCell>

                                        <TableCell align='center'>
                                            {lecturer.empId}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {lecturer.faculty}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {lecturer.department}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {lecturer.center}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {lecturer.building.buildingName}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {lecturer.level}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {lecturer.rank}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Link
                                                to={`/update-lecturer/${lecturer.id}`}
                                            >
                                                <IconButton
                                                    color='secondary'
                                                    aria-label='edit the lecturer'
                                                >
                                                    <CreateIcon
                                                        style={{
                                                            color: green[500]
                                                        }}
                                                    />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <IconButton
                                                onClick={() =>
                                                    deleteDialogOpener(
                                                        lecturer.id
                                                    )
                                                }
                                                color='secondary'
                                                aria-label='add an alarm'
                                            >
                                                <DeleteIcon
                                                    style={{ color: red[500] }}
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!isLoading &&
                    loadedLecturers &&
                    loadedLecturers.lecturers.length === 0 && (
                        <React.Fragment>
                            <Typography
                                variant='h5'
                                align='center'
                                color='textSecondary'
                                paragraph
                                className={classes.marginT}
                            >
                                You haven’t created any lecturers yet
                            </Typography>
                            <div>
                                <Grid container spacing={2} justify='center'>
                                    <Grid item>
                                        <Button
                                            href='/admin/crud/lecturer-create'
                                            variant='outlined'
                                            color='primary'
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
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {'Delete confiramtion dialog box?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you realy wanted to delete this Building?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={lecturerDeleteHandler} color='primary'>
                        Yes
                    </Button>
                    <Button
                        onClick={deleteDialogCloser}
                        color='primary'
                        autoFocus
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
export default ViewLecturers;
