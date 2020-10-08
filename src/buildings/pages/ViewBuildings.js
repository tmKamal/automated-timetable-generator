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

const ViewBuildings = () => {
    const classes = useStyles();
    const [loadedBuildings, setLoadedBuildings] = useState();
    const { isLoading,  sendRequest} = useHttpClient();
    const [deleteId, setDeleteId] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteSuccMsg, setDeleteSuccMsg] = useState();
    const [reload, setReload] = useState(); //use to fetch buildings again, after deleting a building.

    useEffect(() => {
        const fetchingBuildings = async () => {
            try {
                setLoadedBuildings(
                    await sendRequest(
                        'https://timetable-generator-api.herokuapp.com/api/building'
                    )
                );
            } catch (err) {}
        };
        fetchingBuildings();
    }, [sendRequest, reload]);

    const deleteDialogOpener = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };
    const deleteDialogCloser = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };
    const buildingDeleteHandler = () => {
        const deleteBuilding = async () => {
            try {
                const delMsg = await sendRequest(
                    `https://timetable-generator-api.herokuapp.com/api/building/${deleteId}`,
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
            } catch (err) {
                deleteDialogCloser();
            }
        };
        deleteBuilding();
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
                    Buildings
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {deleteSuccMsg && (
                    <Alert
                        onClose={() => {
                            setDeleteSuccMsg(false);
                        }}
                    >
                        Building has been successfully deleted.
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>

                                <TableCell align='center'>
                                    Lec Capacity
                                </TableCell>
                                <TableCell align='center'>
                                    Lab Capacity
                                </TableCell>
                                <TableCell align='center'>Edit</TableCell>
                                <TableCell align='center'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isLoading &&
                                loadedBuildings &&
                                loadedBuildings.buildings.map((building) => (
                                    <TableRow key={building.id}>
                                        <TableCell component='th' scope='row'>
                                            {building.buildingName}
                                        </TableCell>

                                        <TableCell align='center'>
                                            {building.lecHallCapacity}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {building.labCapacity}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Link
                                                to={`/update/building/${building.id}`}
                                            >
                                                <IconButton
                                                    color='secondary'
                                                    aria-label='edit the building'
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
                                                        building.id
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
                    loadedBuildings &&
                    loadedBuildings.buildings.length === 0 && (
                        <React.Fragment>
                            <Typography
                                variant='h5'
                                align='center'
                                color='textSecondary'
                                paragraph
                                className={classes.marginT}
                            >
                                You haven’t created any buildings yet
                            </Typography>
                            <div>
                                <Grid container spacing={2} justify='center'>
                                    <Grid item>
                                        <Button
                                            href='/admin/crud/building-create'
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
                    <Button onClick={buildingDeleteHandler} color='primary'>
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
export default ViewBuildings;
