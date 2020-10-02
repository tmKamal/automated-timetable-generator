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
import { set } from 'mongoose';
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

const AddLecturer = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [msg, setMsg] = useState();
    const [buildingData, setBuildingData] = useState();
    const [values, setValues] = useState({
        lecturerName: '',
        empId: '',
        faculty: '',
        department: '',
        center: '',
        building: '',
        level: ''
    });

    const {
        lecturerName,
        empId,
        faculty,
        department,
        center,
        building,
        level
    } = values;

    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null);
        errorPopupCloser();
    };
    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/building/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setBuildingData(response);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };
        fetchBuilding();
    }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        errorPopupCloser();
        const location = {
            lecturerName,
            empId,
            faculty,
            department,
            center,
            building,
            level
        };
        const lecturer = {
            lecturerName,
            empId,
            faculty,
            department,
            center,
            building,
            level
        };
        console.log(lecturer);
        try {
            const responseData = sendRequest(
                'https://timetable-generator-api.herokuapp.com/api/lecturer/',
                'POST',
                JSON.stringify(location),
                { 'Content-Type': 'application/json' }
            );
            if (error) {
                console.log(error);
            }
            console.log(responseData);
            if (responseData) {
                setValues({
                    lecturerName: '',
                    empId: '',
                    faculty: '',
                    department: '',
                    center: '',
                    building: '',
                    level: ''
                });
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
                        Add a Lecturer
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
                                    onChange={onChangeHandler('lecturerName')}
                                    value={lecturerName}
                                    id='lecturerName'
                                    name='lecturerName'
                                    variant='outlined'
                                    label='Lecturer Name'
                                    error={
                                        error.param === 'lecturerName'
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        error.param === 'lecturerName'
                                            ? error.msg
                                            : ''
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    onChange={onChangeHandler('empId')}
                                    value={empId}
                                    id='empId'
                                    name='empId'
                                    variant='outlined'
                                    label='Lecturer Employee ID'
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Faculty
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={faculty}
                                        onChange={onChangeHandler('faculty')}
                                        label='Faculty'
                                    >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Computing'}>
                                            Computing
                                        </MenuItem>
                                        <MenuItem value={'Business'}>
                                            Business
                                        </MenuItem>
                                        <MenuItem value={'Engineering'}>
                                            Engineering
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


              <Grid item xs={12}>
              <FormControl style={{width:'552px'}} variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                <Select
                  
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={department}
                  onChange={onChangeHandler("department")}
                  label="department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
                  <MenuItem value={'Data Science'}>Data Science</MenuItem>
                  <MenuItem value={'Networking'}>Networking</MenuItem>
                  <MenuItem value={'Civil Engineering'}>Civil Engineering</MenuItem>
                  <MenuItem value={'Electronics'}>Electronics</MenuItem>
                  <MenuItem value={'Business Administration'}>Business Administration</MenuItem>
                  <MenuItem value={'Digital Marketing'}>Digital Marketing</MenuItem>
                </Select>
              </FormControl>
              </Grid>


                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Center
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={center}
                                        onChange={onChangeHandler('center')}
                                        label='Center'
                                    >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Malabe'}>
                                            Malabe
                                        </MenuItem>
                                        <MenuItem value={'Kandy'}>
                                            Kandy
                                        </MenuItem>
                                        <MenuItem value={'Kurunegala'}>
                                            Kurunegala
                                        </MenuItem>
                                        <MenuItem value={'Matara'}>
                                            Matara
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Building
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={building}
                                        onChange={onChangeHandler('building')}
                                        label='Building'
                                    >
                                        {!isLoading &&
                                            buildingData &&
                                            buildingData.buildings.map((b) => {
                                                return (
                                                    <MenuItem
                                                        key={b.id}
                                                        value={b.id}
                                                    >
                                                        {b.buildingName}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Level
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={level}
                                        onChange={onChangeHandler('level')}
                                        label='Level'
                                    >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                    </Select>
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
                                Submit
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default AddLecturer;
