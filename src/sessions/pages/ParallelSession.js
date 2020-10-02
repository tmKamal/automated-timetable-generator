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
    makeStyles,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Input,
    ListItemText
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const ParallelSessions = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [msg, setMsg] = useState();
    const [reload, setReload] = useState();
    const [values, setValues] = useState({
        sessionArray: [],
        sessionType: ''
    });

    const [sessionData, setSessionData] = useState();
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const { sessionArray, sessionType } = values;

    useEffect(() => {
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
        const parallelSess = {
            sessionArray
        };
        console.log(parallelSess);
        try {
            const responseData = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/session/paralSessions`,
                'POST',
                JSON.stringify(parallelSess),
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
                        Parallel Sessions
                    </Typography>

                    <form
                        onSubmit={submitHandler}
                        className={classes.form}
                        noValidate
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='groupType'>
                                        Session Type
                                    </InputLabel>
                                    <Select
                                        labelId='groupType'
                                        id='groupType'
                                        value={sessionType}
                                        onChange={onChangeHandler(
                                            'sessionType'
                                        )}
                                        label='groupType'
                                    >
                                        <MenuItem value={'Lecture'}>
                                            Lecture
                                        </MenuItem>
                                        <MenuItem value={'Tutorial'}>
                                            Tutorial
                                        </MenuItem>
                                        <MenuItem value={'Practical'}>
                                            Practical
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {sessionType == 'Lecture' && (
                                <Grid item xs={12}>
                                    <FormControl
                                        style={{ width: '552px' }}
                                        variant='outlined'
                                        className={classes.formControl}
                                    >
                                        <InputLabel id='demo-mutiple-checkbox-outlined-label'>
                                            Lecture Sessions
                                        </InputLabel>
                                        <Select
                                            labelId='demo-mutiple-checkbox-outlined-label'
                                            id='demo-mutiple-checkbox-outlined'
                                            multiple
                                            value={sessionArray}
                                            onChange={onChangeHandler(
                                                'sessionArray'
                                            )}
                                            input={<Input />}
                                            renderValue={(selected) =>
                                                selected.join(', ')
                                            }
                                            MenuProps={MenuProps}
                                        >
                                            {!isLoading &&
                                                sessionData &&
                                                sessionData.map((s) =>
                                                    s.tag.tagType ==
                                                    'Lecture' ? (
                                                        <MenuItem
                                                            key={s.id}
                                                            value={s.id}
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    sessionArray.indexOf(
                                                                        s.id
                                                                    ) > -1
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    s.subjectCode +
                                                                    ' ' +
                                                                    s.tag
                                                                        .tagType +
                                                                    ' - ' +
                                                                    s
                                                                        .studentGroup
                                                                        .academicYearSem +
                                                                    '.' +
                                                                    s
                                                                        .studentGroup
                                                                        .groupNumber
                                                                }
                                                            />
                                                        </MenuItem>
                                                    ) : null
                                                )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            {sessionType == 'Tutorial' && (
                                <Grid item xs={12}>
                                    <FormControl
                                        style={{ width: '552px' }}
                                        variant='outlined'
                                        className={classes.formControl}
                                    >
                                        <InputLabel id='demo-mutiple-checkbox-outlined-label'>
                                            Tutorial Sessions
                                        </InputLabel>
                                        <Select
                                            labelId='demo-mutiple-checkbox-outlined-label'
                                            id='demo-mutiple-checkbox-outlined'
                                            multiple
                                            value={sessionArray}
                                            onChange={onChangeHandler(
                                                'sessionArray'
                                            )}
                                            input={<Input />}
                                            renderValue={(selected) =>
                                                selected.join(', ')
                                            }
                                            MenuProps={MenuProps}
                                        >
                                            {!isLoading &&
                                                sessionData &&
                                                sessionData.map((s) =>
                                                    s.tag.tagType ==
                                                    'Tutorial' ? (
                                                        <MenuItem
                                                            key={s.id}
                                                            value={s.id}
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    sessionArray.indexOf(
                                                                        s.id
                                                                    ) > -1
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    s.subjectCode +
                                                                    ' ' +
                                                                    s.tag
                                                                        .tagType +
                                                                    ' - ' +
                                                                    s
                                                                        .studentGroup
                                                                        .academicYearSem +
                                                                    '.' +
                                                                    s
                                                                        .studentGroup
                                                                        .groupNumber
                                                                }
                                                            />
                                                        </MenuItem>
                                                    ) : null
                                                )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            {sessionType == 'Practical' && (
                                <Grid item xs={12}>
                                    <FormControl
                                        style={{ width: '552px' }}
                                        variant='outlined'
                                        className={classes.formControl}
                                    >
                                        <InputLabel id='demo-mutiple-checkbox-outlined-label'>
                                            Practical Sessions
                                        </InputLabel>
                                        <Select
                                            labelId='demo-mutiple-checkbox-outlined-label'
                                            id='demo-mutiple-checkbox-outlined'
                                            multiple
                                            value={sessionArray}
                                            onChange={onChangeHandler(
                                                'sessionArray'
                                            )}
                                            input={<Input />}
                                            renderValue={(selected) =>
                                                selected.join(', ')
                                            }
                                            MenuProps={MenuProps}
                                        >
                                            {!isLoading &&
                                                sessionData &&
                                                sessionData.map((s) =>
                                                    s.tag.tagType ==
                                                    'Practical' ? (
                                                        <MenuItem
                                                            key={s.id}
                                                            value={s.id}
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    sessionArray.indexOf(
                                                                        s.id
                                                                    ) > -1
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    s.subjectCode +
                                                                    ' ' +
                                                                    s.tag
                                                                        .tagType +
                                                                    ' - ' +
                                                                    s.subGroup
                                                                        .academicYearSem +
                                                                    '.' +
                                                                    s.subGroup
                                                                        .groupNumber +
                                                                    '.' +
                                                                    s.subGroup
                                                                        .subGroupNumber
                                                                }
                                                            />
                                                        </MenuItem>
                                                    ) : null
                                                )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}

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
export default ParallelSessions;
