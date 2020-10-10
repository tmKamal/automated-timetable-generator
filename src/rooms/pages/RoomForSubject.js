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

const RoomForSubject = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [msg, setMsg] = useState();
    const [reload, setReload] = useState();
    const [values, setValues] = useState({
        roomId: '',
        subjectId: '',
        tagId: ''
    });
    const [roomData, setRoomData] = useState();
    const [subjectData, setSubjectData] = useState();
    const [tagData, setTagData] = useState();
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const { roomId, subjectId, tagId } = values;

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

        const fetchSubjects = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/subject/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setSubjectData(response.subjects);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/tag/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setTagData(response.tags);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };

        fetchRooms();
        fetchSubjects();
        fetchTags();
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
        const subject = {
            roomId,
            tagId
        };
        console.log(subject);
        try {
            const responseData = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/subject/room/${subjectId}`,
                'PATCH',
                JSON.stringify(subject),
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
                        Preferred Room for a Subject
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
                                        Subject Name
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={subjectId}
                                        onChange={onChangeHandler('subjectId')}
                                        label='Select the Subject'
                                    >
                                        {!isLoading &&
                                            subjectData &&
                                            subjectData.map((s) => {
                                                return (
                                                    <MenuItem
                                                        key={s.id}
                                                        value={s.id}
                                                    >
                                                        {s.subjectName}
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
                                        Tag
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={tagId}
                                        onChange={onChangeHandler('tagId')}
                                        label='Select the Tag'
                                    >
                                        {!isLoading &&
                                            tagData &&
                                            tagData.map((t) => {
                                                return (
                                                    <MenuItem
                                                        key={t.id}
                                                        value={t.id}
                                                    >
                                                        {t.tagType}
                                                    </MenuItem>
                                                );
                                            })}
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
export default RoomForSubject;
