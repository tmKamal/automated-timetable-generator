import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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
    },
    errorTextShow: {
        color: 'red',
        display: 'block'
    },
    errorTextHide: {
        color: 'black',
        display: 'none'
    }
}));

const AddWorkDays = () => {
    const [saved, setSaved] = React.useState(false);
    const history = useHistory();
    const {
        isLoading,
        error1,
        sendRequest,
        errorPopupCloser
    } = useHttpClient();
    const [msg, setMsg] = React.useState();
    const classes = useStyles();
    const [state, setState] = React.useState({
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });
    const [countDays, setCountDays] = React.useState(1);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleDate = (e) => {
        if (e.target.value > 7) {
            setCountDays(7);
        } else {
            setCountDays(e.target.value);
        }
    };

    const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    } = state;

    const error =
        [monday, tuesday, wednesday, thursday, friday, saturday, sunday].filter(
            (v) => v
        ).length > countDays;

    const submitHandler = async (e) => {
        e.preventDefault();
        const days = {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        };
        const body = { days, countDays };
        console.log(body);
        try {
            const responseData = await sendRequest(
                'https://timetable-generator-api.herokuapp.com/api/workdays/',
                'POST',
                JSON.stringify(body),
                { 'Content-Type': 'application/json' }
            );
            if (error) {
                console.log(error);
            }
            console.log(responseData);
            if (responseData) {
                setState({
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                });
                setCountDays(1);
                console.log('ji' + responseData.msg);
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
                        style={{ marginBottom: '30px' }}
                        component='h1'
                        variant='h4'
                        align='center'
                    >
                        Add Working Days
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
                                    onChange={(e) => handleDate(e)}
                                    value={countDays}
                                    id='countDays'
                                    name='countDays'
                                    variant='outlined'
                                    label='Working days per week'
                                    fullWidth
                                    type='number'
                                    InputProps={{
                                        inputProps: { min: 1, max: 7 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component='legend'>
                                    <Typography
                                        style={{ marginBottom: '10px' }}
                                        component='h5'
                                        variant='h5'
                                        align='left'
                                    >
                                        Select Days
                                    </Typography>
                                </FormLabel>
                                <FormGroup style={{ marginLeft: '30px' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={monday}
                                                onChange={handleChange}
                                                name='monday'
                                            />
                                        }
                                        label='monday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={tuesday}
                                                onChange={handleChange}
                                                name='tuesday'
                                            />
                                        }
                                        label='tuesday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={wednesday}
                                                onChange={handleChange}
                                                name='wednesday'
                                            />
                                        }
                                        label='wednesday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={thursday}
                                                onChange={handleChange}
                                                name='thursday'
                                            />
                                        }
                                        label='thursday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={friday}
                                                onChange={handleChange}
                                                name='friday'
                                            />
                                        }
                                        label='friday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={saturday}
                                                onChange={handleChange}
                                                name='saturday'
                                            />
                                        }
                                        label='saturday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sunday}
                                                onChange={handleChange}
                                                name='sunday'
                                            />
                                        }
                                        label='sunday'
                                    />
                                </FormGroup>

                                <div
                                    className={
                                        error
                                            ? classes.errorTextShow
                                            : classes.errorTextHide
                                    }
                                >
                                    Please choose only {countDays} days
                                </div>
                            </Grid>
                            {error1 && (
                                <Grid item xs={12}>
                                    <Alert severity='error'>
                                        <AlertTitle>Error</AlertTitle>
                                        <strong>
                                            {error1.backendMsg
                                                ? error1.backendMsg
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
                                onClick={() => setSaved(!saved)}
                            >
                                save
                            </Button>

                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                disabled={saved ? false : true}
                                onClick={() => history.push('/add-worktime')}
                            >
                                continue
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default AddWorkDays;
