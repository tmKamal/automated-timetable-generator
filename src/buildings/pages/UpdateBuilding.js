import React, { useState, useEffect } from 'react';
import {
    CssBaseline,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    makeStyles
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useHttpClient } from '../../shared/custom-hooks/http-hook';
import { useParams, useHistory } from 'react-router-dom';

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
    btnGrid: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttons: {},
    buttonsTwo: {},
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));

const UpdateBuilding = () => {
    const classes = useStyles();
    const buildingId = useParams().bid;
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [loadedBuilding, setLoadedBuilding] = useState();
    const [msg, setMsg] = useState();
    const [reload, setReload] = useState();
    const history = useHistory();
    const [values, setValues] = useState({
        buildingName: '',
        lecHallCapacity: '',
        labCapacity: '',
        description: ''
    });

    const { buildingName, lecHallCapacity, labCapacity, description } = values;
    /* fetching building details */
    useEffect(() => {
        const fetchBuilding = async () => {
            const fetchedBuilding = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/building/${buildingId}`
            );
            setLoadedBuilding(fetchedBuilding.building);
        };
        fetchBuilding();
    }, [sendRequest, reload]);

    useEffect(() => {
        if (loadedBuilding) {
            setValues({
                ...values,
                buildingName: loadedBuilding.buildingName,
                lecHallCapacity: loadedBuilding.lecHallCapacity,
                labCapacity: loadedBuilding.labCapacity,
                description: loadedBuilding.description
            });
        }
    }, [loadedBuilding]);

    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null);
        errorPopupCloser();
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        errorPopupCloser();
        const location = {
            buildingName,
            lecHallCapacity,
            labCapacity,
            description
        };
        console.log(location);
        try {
            const responseData = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/building/${buildingId}`,
                'PATCH',
                JSON.stringify(location),
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
    const backToView = () => {
        history.push('/view-buildings');
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main style={{ marginTop: '100px' }} className={classes.layout}>
                <Paper className={classes.paper}>
                    {!isLoading && (
                        <React.Fragment>
                            <Typography
                                style={{ marginBottom: '20px' }}
                                component='h1'
                                variant='h4'
                                align='center'
                            >
                                Update Building
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
                                            onChange={onChangeHandler(
                                                'buildingName'
                                            )}
                                            value={buildingName}
                                            id='buildingName'
                                            name='buildingName'
                                            variant='outlined'
                                            label='Building Name'
                                            error={
                                                error.param === 'buildingName'
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                error.param === 'buildingName'
                                                    ? error.msg
                                                    : ''
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            onChange={onChangeHandler(
                                                'lecHallCapacity'
                                            )}
                                            value={lecHallCapacity}
                                            id='lecHallCapacity'
                                            name='lecHallCapacity'
                                            variant='outlined'
                                            label='Lecture Hall Capacity'
                                            error={
                                                error.param ===
                                                'lecHallCapacity'
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                error.param ===
                                                'lecHallCapacity'
                                                    ? error.msg
                                                    : ''
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            onChange={onChangeHandler(
                                                'labCapacity'
                                            )}
                                            value={labCapacity}
                                            id='labCapacity'
                                            name='labCapacity'
                                            variant='outlined'
                                            label='Labarotary Capacity'
                                            error={
                                                error.param === 'labCapacity'
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                error.param === 'labCapacity'
                                                    ? error.msg
                                                    : ''
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={onChangeHandler(
                                                'description'
                                            )}
                                            value={description}
                                            required
                                            id='description'
                                            label='Description'
                                            multiline
                                            rows={4}
                                            variant='outlined'
                                            error={
                                                error.param === 'description'
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                error.param === 'description'
                                                    ? error.msg
                                                    : ''
                                            }
                                            fullWidth
                                        />
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
                                                <AlertTitle>
                                                    Success !!
                                                </AlertTitle>
                                                {msg}
                                            </Alert>
                                        </Grid>
                                    )}
                                </Grid>
                                <div className={classes.btnGrid}>
                                    <div className={classes.buttonsTwo}>
                                        <Button
                                            variant='outlined'
                                            color='primary'
                                            className={classes.button}
                                            onClick={backToView}
                                        >
                                            Back to View
                                        </Button>
                                    </div>
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
                                </div>
                            </form>
                        </React.Fragment>
                    )}
                    {isLoading && (
                        <Typography
                            style={{ marginBottom: '20px' }}
                            component='h1'
                            variant='h4'
                            align='center'
                        >
                            Form is loading....
                        </Typography>
                    )}
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default UpdateBuilding;
