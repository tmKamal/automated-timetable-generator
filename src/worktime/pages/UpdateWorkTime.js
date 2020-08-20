import React from 'react';
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
    const [time, setTime] = React.useState({
        hours: '8',
        minutes: '30'
    });

    const { hours, minutes } = time;

    const onChangeHandler = (inputFieldName) => (e) => {
        setTime({ ...time, [inputFieldName]: e.target.value });
    };
    const [slot, setSlot] = React.useState('60');

    const handleChange = (event) => {
        setSlot(event.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const body = { time, slot };
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
                        Add Working Time
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
                                        value={slot}
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
