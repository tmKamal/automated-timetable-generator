import React, { useState, useEffect } from 'react';
import {
    CssBaseline,
    Paper,
    Typography,
    Grid,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    makeStyles
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useHttpClient } from '../../shared/custom-hooks/http-hook';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
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
    },
    formControl: {
        margin: theme.spacing(3)
    },
    alignRight: {
        textAlign: 'right'
    }
}));

const UpdateWorkTime = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [loadedData, setLoadedData] = useState();
    const [slot, setSlot] = useState('');
    const [time, setTime] = useState({
        hours: '',
        minutes: ''
    });
    const { hours, minutes } = time;
    const [msg, setMsg] = useState();
    const [reload, setReload] = useState();
    const history = useHistory();
    const onChangeHandler = (inputFieldName) => (e) => {
        setTime({ ...time, [inputFieldName]: e.target.value });
    };

    const handleChange = (event) => {
        setSlot(event.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const id = loadedData._id;
        const body = { id, time, slot };
        console.log(body);
        try {
            const responseData = await sendRequest(
                `http://localhost:8000/api/worktime/time`,
                'PATCH',
                JSON.stringify(body),
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
    useEffect(() => {
        const lTime = async () => {
            const fetchedTime = await sendRequest(
                `http://localhost:8000/api/worktime/`
            );
            setLoadedData(fetchedTime);
        };
        lTime();
    }, [sendRequest, reload]);

    useEffect(() => {
        if (loadedData) {
            setTime(loadedData.time);
            setSlot(loadedData.slot);
            console.log(loadedData);
        }
    }, [loadedData]);
    return (
        <React.Fragment>
            <CssBaseline />

            <main style={{ marginTop: '100px' }} className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography
                        style={{ marginBottom: '30px' }}
                        component='h1'
                        variant='h4'
                        align='center'
                    >
                        Update Working Time
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
                                    onChange={onChangeHandler('hours')}
                                    value={hours}
                                    id='hours'
                                    name='hours'
                                    variant='outlined'
                                    label='Working hours per day'
                                    fullWidth
                                    style={{ marginBottom: '30px' }}
                                />
                                <TextField
                                    required
                                    onChange={onChangeHandler('minutes')}
                                    value={minutes}
                                    id='minutes'
                                    name='minutes'
                                    variant='outlined'
                                    label='Minutes'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component='fieldset'>
                                    <FormLabel component='legend'>
                                        <Typography
                                            style={{ marginBottom: '10px' }}
                                            component='h5'
                                            variant='h5'
                                            align='left'
                                        >
                                            Select Time slots
                                        </Typography>
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label='slot'
                                        name='slot1'
                                        value={slot.toString()}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value='60'
                                            control={<Radio />}
                                            label='1 Hour time slot'
                                        />
                                        <FormControlLabel
                                            value='30'
                                            control={<Radio />}
                                            label='30 Minute timeslot'
                                        />
                                    </RadioGroup>
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
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default UpdateWorkTime;
