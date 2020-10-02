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

const UpdateTag = () => {
    const classes = useStyles();
    const tagId = useParams().tagid;
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [loadedTag, setLoadedTag] = useState();
    const [msg, setMsg] = useState();
    const [reload, setReload] = useState();
    const history = useHistory();
    const [values, setValues] = useState({
        tagType: ''
    });

    const { tagType } = values;
    /* fetching tags details */
    useEffect(() => {
        const loadedTag = async () => {
            const fetchedTag = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/tag/${tagId}`
            );
            setLoadedTag(fetchedTag.tag);
        };
        loadedTag();
    }, [sendRequest, reload]);

    useEffect(() => {
        if (loadedTag) {
            setValues({
                ...values,
                tagType: loadedTag.tagType
            });
        }
    }, [loadedTag]);

    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null);
        errorPopupCloser();
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        errorPopupCloser();
        const group = {
            tagType
        };
        console.log(group);
        try {
            const responseData = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/tag/${tagId}`,
                'PATCH',
                JSON.stringify(group),
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
        history.push('/view-tag');
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
                                            onChange={onChangeHandler(
                                                'tagType'
                                            )}
                                            value={tagType}
                                            id='tagType'
                                            name='tagType'
                                            variant='outlined'
                                            label='Tag Type'
                                            error={
                                                error.param === 'tagType'
                                                    ? true
                                                    : false
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
export default UpdateTag;
