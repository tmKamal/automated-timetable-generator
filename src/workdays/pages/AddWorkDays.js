import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing(3)
    },
    alignRight: {
        textAlign: 'right'
    }
}));

const AddWorkDays = () => {
    const [saved, setSaved] = React.useState(true);
    const classes = useStyles();
    const [state, setState] = React.useState({
        Monday: true,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
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
        ).length > 6;
    return (
        <React.Fragment>
            <div className={classes.root}>
                <FormControl
                    required
                    error={error}
                    component='fieldset'
                    className={classes.formControl}
                >
                    <FormLabel component='legend'>Add Working days</FormLabel>

                    <FormGroup>
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

                    <FormHelperText>Please choose only 6 days</FormHelperText>
                </FormControl>
            </div>
            <div className={classes.alignRight}>
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.formControl}
                    onClick={() => setSaved(!saved)}
                >
                    Save
                </Button>

                <Button
                    variant='contained'
                    color='primary'
                    className={classes.formControl}
                    disabled={saved}
                >
                    Continue
                </Button>
            </div>
        </React.Fragment>
    );
};
export default AddWorkDays;
