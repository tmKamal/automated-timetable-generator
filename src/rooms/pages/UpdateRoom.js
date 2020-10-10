import React, { useState, useEffect } from 'react';
import {
    CssBaseline,
    Paper,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    makeStyles
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useHttpClient } from '../../shared/custom-hooks/http-hook';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(5),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    btnGrid: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttons: {},
    buttonsTwo: {},
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));

const UpdateRoom = () => {
    const classes = useStyles();
    const roomId = useParams().rid;
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [loadedRoom, setLoadedRoom] = useState();
    const [loadedBuildings, setLoadedBuildings] = useState();
    const [msg, setMsg] = useState();
    const [reload, setReload] = useState();
    const history = useHistory();
    const [values, setValues] = useState({
        roomName: '',
        roomCapacity: '',
        roomType: '',
        buildingName: ''
    });

    const { roomName, roomCapacity, roomType, buildingName } = values;
    /* fetching building details */
    useEffect(() => {
        const fetchRoom = async () => {
            const fetchedRooms = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/room/${roomId}`
            );
            setLoadedRoom(fetchedRooms.room);
            console.log(fetchedRooms);
        };
        const loadedBuildingsFunc = async () => {
            const fetchedBuilding = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/building`
            );
            setLoadedBuildings(fetchedBuilding);
        };
        fetchRoom();
        loadedBuildingsFunc();
    }, [sendRequest, reload]);

    useEffect(() => {
        if (loadedRoom) {
            console.log('rooms' + loadedRoom);
            setValues({
                ...values,
                roomName: loadedRoom.roomName,
                roomCapacity: loadedRoom.roomCapacity,
                roomType: loadedRoom.roomType,
                buildingName: loadedRoom.buildingId.id
            });
        }
    }, [loadedRoom]);

    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null);
        errorPopupCloser();
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        errorPopupCloser();
        const room = {
            roomName,
            roomCapacity,
            roomType,
            buildingId: buildingName
        };
        console.log(room);
        try {
            const responseData = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/room/${roomId}`,
                'PATCH',
                JSON.stringify(room),
                { 'Content-Type': 'application/json' }
            );
            if (error) {
                console.log(error);
            }
            console.log(responseData);
            if (responseData) {
                setReload(true);
                console.log(responseData);
                setMsg(responseData.msg);
            }
        } catch (err) {
            console.log(error);
        }
    };
    const backToView = () => {
        history.push('/view-room');
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main style={{ marginTop: '100px' }} className={classes.layout}>
                <Paper className={classes.paper}>
                    {!isLoading && (
                        <React.Fragment>
                            <Typography
                                style={{ marginBottom: '20px' }}
                                component='h1'
                                variant='h4'
                                align='center'
                            >
                                Update Room
                            </Typography>

                            <form
                                onSubmit={submitHandler}
                                className={classes.form}
                                noValidate
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            onChange={onChangeHandler(
                                                'roomName'
                                            )}
                                            value={roomName}
                                            id='roomName'
                                            name='roomName'
                                            variant='outlined'
                                            label='Room Name'
                                            error={
                                                error.param === 'roomName'
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                error.param === 'roomName'
                                                    ? error.msg
                                                    : ''
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            onChange={onChangeHandler(
                                                'roomCapacity'
                                            )}
                                            value={roomCapacity}
                                            id='roomCapacity'
                                            name='roomCapacity'
                                            variant='outlined'
                                            label='Room Capacity'
                                            error={
                                                error.param === 'roomCapacity'
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                error.param === 'roomCapacity'
                                                    ? error.msg
                                                    : ''
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl
                                            fullWidth
                                            variant='outlined'
                                            className={classes.formControl}
                                        >
                                            <InputLabel id='demo-simple-select-outlined-label'>
                                                Building Name
                                            </InputLabel>
                                            <Select
                                                labelId='demo-simple-select-outlined-label'
                                                id='demo-simple-select-outlined'
                                                value={buildingName}
                                                onChange={onChangeHandler(
                                                    'buildingName'
                                                )}
                                                label='Building'
                                            >
                                                {!isLoading &&
                                                    loadedBuildings &&
                                                    loadedBuildings.buildings.map(
                                                        (b) => {
                                                            return (
                                                                <MenuItem
                                                                    key={b.id}
                                                                    value={b.id}
                                                                >
                                                                    {
                                                                        b.buildingName
                                                                    }
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl
                                            fullWidth
                                            variant='outlined'
                                            className={classes.formControl}
                                        >
                                            <InputLabel id='demo-simple-select-outlined-label'>
                                                Room Type
                                            </InputLabel>
                                            <Select
                                                labelId='demo-simple-select-outlined-label'
                                                id='demo-simple-select-outlined'
                                                label='Select a room'
                                                value={roomType}
                                                onChange={onChangeHandler(
                                                    'roomType'
                                                )}
                                            >
                                                <MenuItem value={'lecHall'}>
                                                    Lecture Hall
                                                </MenuItem>
                                                <MenuItem value={'lab'}>
                                                    Laboratory
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {error && (
                                        <Grid item xs={12}>
                                            <Alert severity='error'>
                                                <AlertTitle>Error</AlertTitle>
                                                <strong>
                                                    {error.backendMsg
                                                        ? error.backendMsg
                                                        : 'Please Resolve the above error & try again'}{' '}
                                                </strong>
                                            </Alert>
                                        </Grid>
                                    )}
                                    {msg && (
                                        <Grid item xs={12}>
                                            <Alert severity='success'>
                                                <AlertTitle>
                                                    Success !!
                                                </AlertTitle>
                                                {msg}
                                            </Alert>
                                        </Grid>
                                    )}
                                </Grid>
                                <div className={classes.btnGrid}>
                                    <div className={classes.buttonsTwo}>
                                        <Button
                                            variant='outlined'
                                            color='primary'
                                            className={classes.button}
                                            onClick={backToView}
                                        >
                                            Back to View
                                        </Button>
                                    </div>
                                    <div className={classes.buttons}>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='primary'
                                            className={classes.button}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </React.Fragment>
                    )}
                    {isLoading && (
                        <Typography
                            style={{ marginBottom: '20px' }}
                            component='h1'
                            variant='h4'
                            align='center'
                        >
                            Form is loading....
                        </Typography>
                    )}
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default UpdateRoom;
