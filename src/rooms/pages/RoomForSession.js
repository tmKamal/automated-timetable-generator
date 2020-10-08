import React, { useState, useEffect } from 'react';
import {
    CssBaseline,
    Paper,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    makeStyles,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useHttpClient } from '../../shared/custom-hooks/http-hook';

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

    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));

const RoomForSession = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [msg, setMsg] = useState();
    const [reload, setReload] = useState();
    const [values, setValues] = useState({
        roomId: '',
        sessionId: ''
    });
    const [roomData, setRoomData] = useState();
    const [sessionData, setSessionData] = useState();
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const { roomId, sessionId } = values;

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/room/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setRoomData(response.rooms);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };

        const fetchSession = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/session/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    //filter out dead sessions
                    const liveSessions = response.sessions.filter(
                        (s) => s.alive == true
                    );
                    //filter in only the normal sessions
                    const normalSessions = liveSessions.filter(
                        (s) => s.type == 'normal'
                    );
                    setSessionData(normalSessions);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };

        fetchRooms();
        fetchSession();
        setReload(false);
    }, [reload]);

    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null);
        errorPopupCloser();
        setDisableSubmitBtn(false);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        errorPopupCloser();
        setDisableSubmitBtn(true);
        const lecturer = {
            roomId
        };
        console.log(lecturer);
        try {
            const responseData = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/session/room/${sessionId}`,
                'PATCH',
                JSON.stringify(lecturer),
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

    return (
        <React.Fragment>
            <CssBaseline />
            <main style={{ marginTop: '100px' }} className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography
                        style={{ marginBottom: '20px' }}
                        component='h1'
                        variant='h4'
                        align='center'
                    >
                        Preferred Room for a Session
                    </Typography>

                    <form
                        onSubmit={submitHandler}
                        className={classes.form}
                        noValidate
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl
                                    fullWidth
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Room Name
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={roomId}
                                        onChange={onChangeHandler('roomId')}
                                        label='Select the room'
                                    >
                                        {!isLoading &&
                                            roomData &&
                                            roomData.map((r) => {
                                                return (
                                                    <MenuItem
                                                        key={r.id}
                                                        value={r.id}
                                                    >
                                                        {r.roomName}
                                                    </MenuItem>
                                                );
                                            })}
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
                                        Session Name
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={sessionId}
                                        onChange={onChangeHandler('sessionId')}
                                        label='Select the room'
                                    >
                                        {!isLoading &&
                                            sessionData &&
                                            sessionData.map((s) =>
                                                s.tag.tagType == 'Practical' ? (
                                                    <MenuItem
                                                        key={s.id}
                                                        value={s.id}
                                                    >
                                                        {s.subjectCode +
                                                            ' ' +
                                                            s.tag.tagType +
                                                            ' - ' +
                                                            s.subGroup
                                                                .academicYearSem +
                                                            '.' +
                                                            s.subGroup
                                                                .groupNumber +
                                                            '.' +
                                                            s.subGroup
                                                                .subGroupNumber}
                                                    </MenuItem>
                                                ) : (
                                                    <MenuItem
                                                        key={s.id}
                                                        value={s.id}
                                                    >
                                                        {s.subjectCode +
                                                            ' ' +
                                                            s.tag.tagType +
                                                            ' - ' +
                                                            s.studentGroup
                                                                .academicYearSem +
                                                            '.' +
                                                            s.studentGroup
                                                                .groupNumber}
                                                    </MenuItem>
                                                )
                                            )}
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
                                        <AlertTitle>Success !!</AlertTitle>
                                        {msg}
                                    </Alert>
                                </Grid>
                            )}
                        </Grid>

                        <div className={classes.buttons}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                disabled={disableSubmitBtn}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default RoomForSession;
