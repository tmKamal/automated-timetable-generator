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
    Checkbox
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

const AddRoom = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [msg, setMsg] = useState();
    const [loadedTags, setLoadedTags] = useState();
    const [checkedTags, setCheckedTags] = useState([]); // To store the selected tags.
    const [values, setValues] = useState({
        roomName: '',
        roomType: '',
        buildingName: ''
    });
    const [buildingData, setBuildingData] = useState();
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
        //fetch tags
        const fetchTags = async () => {
            try {
                const responseTags = await sendRequest(
                    `https://timetable-generator-api.herokuapp.com/api/tag/`
                );
                console.log(responseTags);
                setLoadedTags(responseTags);
            } catch (err) {}
        };

        fetchTags();
        fetchBuilding();
    }, []);
    const { roomName, roomType, buildingName } = values;

    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null);
        errorPopupCloser();
    };

    const toggleTags = (id) => {
        errorPopupCloser(); // clearing errors, if any is present
        // if tags not available in the checkedTags array. it will return -1
        const clickedTag = checkedTags.indexOf(id);
        const allSelectedTags = [...checkedTags];

        if (clickedTag === -1) {
            allSelectedTags.push(id);
        } else {
            allSelectedTags.splice(clickedTag, 1);
        }
        setCheckedTags(allSelectedTags);
        console.log(allSelectedTags);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        errorPopupCloser();
        let selectedBuilding;
        let rCapacity;
        if (roomType == 'lab') {
            selectedBuilding = buildingData.buildings.filter(
                (b) => b.id === buildingName
            );
            setValues({
                ...values,
                roomCapacity: selectedBuilding[0].labCapacity
            });
            rCapacity = selectedBuilding[0].labCapacity;
        } else {
            selectedBuilding = buildingData.buildings.filter(
                (b) => b.id === buildingName
            );
            setValues({
                ...values,
                roomCapacity: selectedBuilding[0].lecHallCapacity
            });
            rCapacity = selectedBuilding[0].lecHallCapacity;
        }
        const room = {
            roomName,
            roomCapacity: rCapacity,
            roomType,
            roomTags: checkedTags,
            buildingId: buildingName
        };
        console.log(room);
        try {
            const responseData = await sendRequest(
                'https://timetable-generator-api.herokuapp.com/api/room/',
                'POST',
                JSON.stringify(room),
                { 'Content-Type': 'application/json' }
            );
            if (error) {
                console.log(error);
            }
            console.log(responseData);
            if (responseData) {
                setValues({
                    roomName: ''
                });
                setCheckedTags([]);

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
                        Add a Room
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
                                    onChange={onChangeHandler('roomName')}
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
                            {/* <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("roomCapacity")}
                  value={roomCapacity}
                  id="roomCapacity"
                  name="roomCapacity"
                  variant="outlined"
                  label="Lecture Hall Capacity"
                  error={error.param==='roomCapacity'? true : false}
                  helperText={error.param==='roomCapacity'? error.msg : ''}
                  fullWidth
                />
              </Grid> */}
                            {/* <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("labCapacity")}
                  value={labCapacity}
                  id="labCapacity"
                  name="labCapacity"
                  variant="outlined"
                  label="Labarotary Capacity"
                  error={error.param==='labCapacity'? true : false}
                  helperText={error.param==='labCapacity'? error.msg : ''}
                  fullWidth
                />
              </Grid> */}
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
                                        label='Select a room'
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
                                        onChange={onChangeHandler('roomType')}
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
                            <Grid item xs={12}>
                                <p>Tags</p>
                                <FormGroup row>
                                    {loadedTags &&
                                        loadedTags.tags.map((tag, i) => (
                                            <FormControlLabel
                                                key={i}
                                                control={
                                                    <Checkbox
                                                        name={tag.tagType}
                                                        onChange={() =>
                                                            toggleTags(tag._id)
                                                        }
                                                        checked={
                                                            checkedTags.indexOf(
                                                                tag._id
                                                            ) == -1
                                                                ? false
                                                                : true
                                                        }
                                                    />
                                                }
                                                label={tag.tagType}
                                            />
                                        ))}
                                </FormGroup>
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
                                Submit
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default AddRoom;
