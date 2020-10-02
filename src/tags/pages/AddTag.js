import React, { useState } from 'react';
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

const AddTag = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [msg, setMsg] = useState();
    const [values, setValues] = useState({
        tagType: ''
    });

    const { tagType } = values;

    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null);
        errorPopupCloser();
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        errorPopupCloser();
        const location = {
            tagType
        };
        console.log(location);
        try {
            const responseData = await sendRequest(
                'https://timetable-generator-api.herokuapp.com/api/tag/',
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
                    tagType: ''
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
                        Add Tag
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
                                    onChange={onChangeHandler('tagType')}
                                    value={tagType}
                                    id='tagType'
                                    name='tagType'
                                    variant='outlined'
                                    label='Tag Type'
                                    error={
                                        error.param === 'tagType' ? true : false
                                    }
                                    helperText={
                                        error.param === 'tagType'
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
export default AddTag;
