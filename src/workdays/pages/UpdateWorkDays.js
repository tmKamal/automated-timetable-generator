import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const UpdateWorkDays = () => {
    const [saved, setSaved] = React.useState(true);
    const classes = useStyles();
    const [state, setState] = React.useState({
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: false,
        Sunday: false
    });
    const [countDays, setCountDays] = React.useState(5);

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
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    } = state;

    const error =
        [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday].filter(
            (v) => v
        ).length > countDays;

    const submitHandler = (e) => {
        e.preventDefault();
        const days = {
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday,
            Saturday,
            Sunday
        };
        const body = { days, countDays };
        console.log(body);
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
                        Update Working Days
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
                                                checked={Monday}
                                                onChange={handleChange}
                                                name='Monday'
                                            />
                                        }
                                        label='Monday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Tuesday}
                                                onChange={handleChange}
                                                name='Tuesday'
                                            />
                                        }
                                        label='Tuesday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Wednesday}
                                                onChange={handleChange}
                                                name='Wednesday'
                                            />
                                        }
                                        label='Wednesday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Thursday}
                                                onChange={handleChange}
                                                name='Thursday'
                                            />
                                        }
                                        label='Thursday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Friday}
                                                onChange={handleChange}
                                                name='Friday'
                                            />
                                        }
                                        label='Friday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Saturday}
                                                onChange={handleChange}
                                                name='Saturday'
                                            />
                                        }
                                        label='Saturday'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Sunday}
                                                onChange={handleChange}
                                                name='Sunday'
                                            />
                                        }
                                        label='Sunday'
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
                        </Grid>
                        <div className={classes.buttons}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}
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
export default UpdateWorkDays;
